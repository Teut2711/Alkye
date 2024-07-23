from django.test import TestCase

# Create your tests here.
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Post


class PostTests(APITestCase):

    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )
        self.user.save()

        # Get JWT token for authentication
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)

        # Set up the authorization header
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        # URL endpoints
        self.post_list_create_url = reverse("post-list-create")
        self.post_detail_url = lambda pk: reverse("post-detail", kwargs={"pk": pk})

    def test_create_post(self):
        data = {
            "title": "Test Post",
            "content": "This is a test post.",
        }
        response = self.client.post(self.post_list_create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, "Test Post")

    def test_get_posts(self):
        # Create a post
        Post.objects.create(
            title="Test Post", content="This is a test post.", author=self.user
        )

        response = self.client.get(self.post_list_create_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Test Post")

    def test_get_post_detail(self):
        # Create a post
        post = Post.objects.create(
            title="Test Post", content="This is a test post.", author=self.user
        )

        response = self.client.get(self.post_detail_url(post.pk), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Test Post")
