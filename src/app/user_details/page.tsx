"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";

interface Post {
  id: number;
  title: string;
}

const fetchPosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data as Post[];
};

export default function User() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>("posts", fetchPosts);

  if (isLoading) {
    return <div>loading.....</div>;
  }
  if (isError) {
    return <div>an error occurred</div>;
  }
  return (
    <div>
      <h2 className="text-3xl font-bold">posts</h2>
      <div>
        {posts?.map((post: Post) => (
          <div key={post.id}>
            <Link href={`/user_details/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
