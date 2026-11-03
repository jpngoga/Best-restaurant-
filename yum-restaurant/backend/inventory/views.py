from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Ingredient, StockMovement
from .serializers import IngredientSerializer, StockMovementSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class StockMovementViewSet(viewsets.ModelViewSet):
    queryset = StockMovement.objects.select_related("ingredient").all()
    serializer_class = StockMovementSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]