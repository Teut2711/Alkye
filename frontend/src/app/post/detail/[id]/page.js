"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function PostDetail({ params }) {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Check if user is logged in and decode the JWT to get user ID
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUserId(decodedToken.username);
    }

    // Fetch the post data
    const fetchPost = async () => {
      try {
        const { post } = await getPost({ id });
        if (post.error) {
          setError(post.error);
        } else {
          setPost(post);
          setTitle(post.title);
          setContent(post.content);
        }
      } catch (error) {
        setError("Failed to fetch post data.");
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!res.ok) throw new Error("Failed to update post");
      router.push("/"); // Redirect after update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete post");

      router.push("/"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Error</h1>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      {loggedInUserId !== post.author_username && (
        <>
          <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </>
      )}
      {loggedInUserId === post.author_username && (
        <>
          <form
            onSubmit={handleUpdate}
            className="space-y-4 w-full max-w-lg mx-auto mt-8"
          >
            <div className="flex flex-col gap-3 w-full">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              >
                Update Post
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Post
          </button>
        </>
      )}
    </main>
  );
}

async function getPost({ id }) {
  let post;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${id}/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    post = await res.json();
  } catch (e) {
    post = { error: e.message || "An unexpected error occurred" };
  }

  return { post };
}
