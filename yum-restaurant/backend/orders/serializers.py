
from django.db import transaction
from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "menu_item", "quantity", "unit_price", "order"]
        read_only_fields = ["id", "unit_price", "order"]

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )
        return value


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "items",
            "status",
            "total_amount",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "customer",
            "status",
            "total_amount",
            "created_at",
        ]

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError(
                "An order must contain at least one item."
            )

        for item in value:
            if not item["menu_item"].is_available:
                raise serializers.ValidationError(
                    f"{item['menu_item'].name} is currently unavailable."
                )

        return value

    @transaction.atomic
    def create(self, validated_data):
        items_data = validated_data.pop("items")
        request = self.context["request"]

        try:
            customer = request.user.customer_profile
        except Exception:
            raise serializers.ValidationError(
                "Your account does not have a customer profile."
            )

        order = Order.objects.create(customer=customer)

        total = 0

        for item_data in items_data:
            menu_item = item_data["menu_item"]
            quantity = item_data["quantity"]

            unit_price = menu_item.price
            total += unit_price * quantity

            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=quantity,
                unit_price=unit_price,
            )

        order.total_amount = total
        order.save(update_fields=["total_amount"])

        return order
