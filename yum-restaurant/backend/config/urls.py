from django.contrib import admin
from django.urls import path, include
from menu.views import ImportMealView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("config.api_urls")),
    path(
        "api/menu/import-meal/",
        ImportMealView.as_view(),
        name="import-meal"
    ),
]