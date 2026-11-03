from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, MenuItem
from .serializers import CategorySerializer, MenuItemSerializer


import json
import urllib.request
import urllib.error
from decimal import Decimal, InvalidOperation
from urllib.parse import urlparse
from pathlib import PurePosixPath

from django.core.files.base import ContentFile
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, MenuItem
from .serializers import CategorySerializer, MenuItemSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.select_related("category").all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.select_related("category").all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ImportMealView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        meal_id = request.data.get("meal_id")
        price = request.data.get("price")

        if not meal_id or not str(meal_id).isdigit():
            return Response(
                {"error": "A valid meal_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            price = Decimal(str(price))
            if not price.is_finite() or price <= 0:
                raise InvalidOperation
        except (InvalidOperation, TypeError, ValueError):
            return Response(
                {"error": "Enter a valid price greater than zero."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        api_url = (
            "https://www.themealdb.com/api/json/v1/1/lookup.php"
            f"?i={meal_id}"
        )

        try:
            req = urllib.request.Request(
                api_url,
                headers={"User-Agent": "Restobit/1.0"},
            )
            with urllib.request.urlopen(req, timeout=15) as response:
                data = json.loads(response.read().decode("utf-8"))

            meals = data.get("meals") or []

            if not meals:
                return Response(
                    {"error": "Meal not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            meal = meals[0]

            category_name = (meal.get("strCategory") or "Other")[:100]
            name = (meal.get("strMeal") or "Imported Meal")[:150]
            description = meal.get("strInstructions") or ""
            image_url = meal.get("strMealThumb") or ""

            category, _ = Category.objects.get_or_create(
                name=category_name,
                defaults={"description": f"{category_name} menu items"},
            )

            item, created = MenuItem.objects.get_or_create(
                category=category,
                name=name,
                defaults={
                    "description": description,
                    "price": price,
                    "is_available": True,
                },
            )

            if not created:
                return Response(
                    {
                        "message": "This meal is already in your menu.",
                        "item": MenuItemSerializer(
                            item, context={"request": request}
                        ).data,
                    },
                    status=status.HTTP_200_OK,
                )

            if image_url:
                image_request = urllib.request.Request(
                    image_url,
                    headers={"User-Agent": "Restobit/1.0"},
                )

                with urllib.request.urlopen(
                    image_request, timeout=20
                ) as image_response:
                    image_data = image_response.read()

                extension = PurePosixPath(
                    urlparse(image_url).path
                ).suffix.lower()

                if extension not in [".jpg", ".jpeg", ".png", ".webp"]:
                    extension = ".jpg"

                item.image.save(
                    f"themealdb_{meal_id}{extension}",
                    ContentFile(image_data),
                    save=True,
                )

            return Response(
                {
                    "message": "Meal imported successfully.",
                    "item": MenuItemSerializer(
                        item, context={"request": request}
                    ).data,
                },
                status=status.HTTP_201_CREATED,
            )

        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
            return Response(
                {"error": "Could not retrieve the meal from TheMealDB."},
                status=status.HTTP_502_BAD_GATEWAY,
            )
