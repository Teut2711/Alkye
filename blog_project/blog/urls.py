from django.urls import path
from .views import PostListCreate, CommentListCreate, PostRetrieveUpdateDestroy

urlpatterns = [
    path("", PostListCreate.as_view(), name="post-list-create"),
    path(
        "<int:pk>/",
        PostRetrieveUpdateDestroy.as_view(),
        name="post-detail",
    ),
    path(
        "<int:post_pk>/comments/",
        CommentListCreate.as_view(),
        name="comment-list-create",
    ),
]
