import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FunctionComponent, useState } from "react";
import { IPost, Comment } from "../components/PostDetails";
import PostDetails from "../components/PostDetails";

export const GET_POST = gql`
  query GetPost($id: String!) {
    getPost(id: $id) {
      id
      title
      content
      creatorName
      commentCount
      upvotes
      downvotes
      creatorId
      comments {
        id
        author
        content
        postId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const PostDetail: NextPage = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const [post, setPost] = useState<IPost>();
  useQuery(GET_POST, {
    variables: { id: postId },
    onCompleted: (data) => {
      setPost(data?.getPost);
      console.log(data);
    },
  });
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <h1>helo</h1>
      <button
        className="sticky hover:bg-gray-600 hover:text-white bg-gray-300 text-gray-600 rounded-md px-4 py-1"
        onClick={() => router.back()}
      >
        Go Back
      </button>
      {post !== undefined && <PostDetails {...post} />}
    </div>
  );
};

export default PostDetail;
