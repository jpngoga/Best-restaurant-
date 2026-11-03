from django.db.models import Sum, Count
from django.db.models.functions import TruncDate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from orders.models import Order
from payments.models import Payment
from accounts.models import Customer
from employees.models import Employee
from menu.models import MenuItem
from inventory.models import Ingredient


class DashboardReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        completed_payments = Payment.objects.filter(status="COMPLETED")

        revenue = completed_payments.aggregate(
            total=Sum("amount")
        )["total"] or 0

        daily_sales = (
            completed_payments
            .annotate(day=TruncDate("created_at"))
            .values("day")
            .annotate(total=Sum("amount"))
            .order_by("-day")[:7]
        )

        data = {
            "total_customers": Customer.objects.count(),
            "total_employees": Employee.objects.count(),
            "total_menu_items": MenuItem.objects.count(),
            "total_ingredients": Ingredient.objects.count(),
            "total_orders": Order.objects.count(),
            "pending_orders": Order.objects.filter(
                status="PENDING"
            ).count(),
            "completed_orders": Order.objects.filter(
                status="COMPLETED"
            ).count(),
            "total_payments": Payment.objects.count(),
            "completed_payments": completed_payments.count(),
            "total_revenue": revenue,
            "daily_sales": list(daily_sales),
        }

        return Response(data)