from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):

    ROLE_CHOICES = [
        ("MANAGER", "Manager"),
        ("CASHIER", "Cashier"),
        ("CHEF", "Chef"),
        ("WAITER", "Waiter"),
        ("RECEPTIONIST", "Receptionist"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="employee_profile"
    )

    phone = models.CharField(max_length=20)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    hire_date = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.role}"