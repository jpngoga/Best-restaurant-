from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import KitchenOrder
from .serializers import KitchenOrderSerializer


class KitchenOrderViewSet(viewsets.ModelViewSet):
    queryset = KitchenOrder.objects.select_related("order").all()
    serializer_class = KitchenOrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]