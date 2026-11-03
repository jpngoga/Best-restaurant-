from django.contrib import admin
from .models import KitchenOrder


@admin.register(KitchenOrder)
class KitchenOrderAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "status",
        "received_at",
        "updated_at",
    )

    list_filter = ("status", "received_at")
    search_fields = ("order__id",)
    list_editable = ("status",)