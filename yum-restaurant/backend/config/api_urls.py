from django.urls import path, include
from rest_framework.routers import DefaultRouter

from menu.views import CategoryViewSet, MenuItemViewSet
from accounts.views import CustomerViewSet
from orders.views import OrderViewSet, OrderItemViewSet
from kitchen.views import KitchenOrderViewSet
from reservations.views import ReservationViewSet
from inventory.views import IngredientViewSet, StockMovementViewSet
from payments.views import PaymentViewSet
from employees.views import EmployeeViewSet
from receipts.views import ReceiptViewSet
from reports.views import DashboardReportView

from menu.views import ImportMealView

from accounts.views import (
    CustomerViewSet,
    RegisterView,
    LoginView
)

router = DefaultRouter()

router.register("categories", CategoryViewSet)
router.register("menu", MenuItemViewSet)
router.register("customers", CustomerViewSet)
router.register("orders", OrderViewSet, basename="order")
router.register("order-items", OrderItemViewSet, basename="order-item")
router.register("kitchen", KitchenOrderViewSet)
router.register("reservations", ReservationViewSet)
router.register("ingredients", IngredientViewSet)
router.register("stock-movements", StockMovementViewSet)
router.register("payments", PaymentViewSet)
router.register("employees", EmployeeViewSet)
router.register("receipts", ReceiptViewSet)


urlpatterns = [
    path("reports/dashboard/", DashboardReportView.as_view(), name="dashboard-report"),
    path("", include(router.urls)),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path(
    "menu/import-meal/",
    ImportMealView.as_view(),
    name="import-meal",
),
]