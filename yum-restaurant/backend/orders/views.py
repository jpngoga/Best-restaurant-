
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = (
            Order.objects
            .select_related("customer", "customer__user")
            .prefetch_related("items", "items__menu_item")
        )

        user = self.request.user

        if user.is_staff or user.is_superuser:
            return queryset

        return queryset.filter(customer__user=user)


class OrderItemViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = OrderItem.objects.select_related(
            "order", "menu_item", "order__customer__user"
        )

        user = self.request.user

        if user.is_staff or user.is_superuser:
            return queryset

        return queryset.filter(order__customer__user=user)
