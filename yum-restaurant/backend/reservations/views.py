from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Reservation
from .serializers import ReservationSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.select_related("customer").all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]