from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Receipt
from .serializers import ReceiptSerializer


class ReceiptViewSet(viewsets.ModelViewSet):
    queryset = Receipt.objects.select_related("order", "payment").all()
    serializer_class = ReceiptSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]