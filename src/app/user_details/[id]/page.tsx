"use client";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface PostDetails {
  title: string;
  body: string;
}

const PostDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: postDetails,
    isLoading,
    isError,
  } = useQuery<PostDetails>(["postDetails", id], async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !postDetails) {
    return <div>Error fetching post details</div>;
  }

  return (
    <div>
      <button onClick={() => router.push("/")} className="m-5 bg-green-500 p-5">
        Back
      </button>
      <h2 className="font-bold text-4xl">Post details</h2>
      <h2 className="font-bold text-2xl underline">{postDetails.title}</h2>
      <p>{postDetails.body}</p>
    </div>
  );
};

export default PostDetails;
