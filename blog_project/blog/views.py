from rest_framework import generics, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            title=serializer.validated_data.get("title"),
            content=serializer.validated_data.get("content"),
            published_date=serializer.validated_data.get("published_date"),
        )

    def get_queryset(self):
        queryset = super().get_queryset()
        username = self.request.query_params.get("author", None)
        if username is not None:
            queryset = queryset.filter(author__username=username)
        return queryset


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]


class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Comment.objects.filter(post_id=self.kwargs["post_pk"])

    # def perform_create(self, serializer):
    #     post = get_object_or_404(Post, id=self.kwargs["post_pk"])
    #     serializer.save(post=post)
