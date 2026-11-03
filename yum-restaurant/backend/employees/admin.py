from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "phone",
        "role",
        "hire_date",
        "salary",
    )
    list_filter = ("role",)
    search_fields = ("user__username", "phone")