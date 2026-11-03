from django.contrib import admin
from .models import Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = (
        "customer_name",
        "reservation_date",
        "reservation_time",
        "number_of_guests",
        "table_number",
        "status",
    )

    list_filter = ("status", "reservation_date")
    search_fields = ("customer_name", "phone")