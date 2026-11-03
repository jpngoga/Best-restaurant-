import uuid
from django.db import models
from orders.models import Order
from payments.models import Payment


class Receipt(models.Model):
    receipt_number = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False
    )

    order = models.OneToOneField(
        Order,
        on_delete=models.PROTECT,
        related_name="receipt"
    )

    payment = models.ForeignKey(
        Payment,
        on_delete=models.PROTECT,
        related_name="receipts"
    )

    issued_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Receipt {self.receipt_number}"