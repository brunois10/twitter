from django.urls import include, path
from rest_framework import routers

from users import views
from tweets.views import TweetListCreateView
from users.views import LoginUserView, RegisterUserView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('tweets/', TweetListCreateView.as_view(), name='tweet-list-create'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('register/', RegisterUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("update_server/", views.update, name="update"),
]

urlpatterns += router.urls
