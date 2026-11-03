from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=150, unique=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unit = models.CharField(max_length=30)
    low_stock_threshold = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=5
    )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class StockMovement(models.Model):
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        related_name="movements"
    )
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    movement_type = models.CharField(
        max_length=10,
        choices=[
            ("IN", "Stock In"),
            ("OUT", "Stock Out"),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ingredient.name} - {self.movement_type}"