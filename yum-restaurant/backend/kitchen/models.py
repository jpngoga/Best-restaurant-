
from django.db import models
from orders.models import Order


class KitchenOrder(models.Model):

    STATUS_CHOICES = [
        ("RECEIVED", "Received"),
        ("PREPARING", "Preparing"),
        ("READY", "Ready"),
        ("SERVED", "Served"),
    ]

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="kitchen_order"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="RECEIVED"
    )

    notes = models.TextField(blank=True)

    received_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Kitchen Order #{self.order.id} - {self.status}"
