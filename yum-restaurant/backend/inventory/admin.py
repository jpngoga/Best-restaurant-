from django.contrib import admin
from .models import Ingredient, StockMovement

admin.site.register(Ingredient)
admin.site.register(StockMovement)