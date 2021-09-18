import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import gql from "graphql-tag";
import type { NextPage } from "next";
import { useState } from "react";
import FormInput from "../components/FormInput";
import PostBrief from "../components/PostBrief";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      creatorName
      commentCount
      upvotes
      downvotes
      creatorId
      createdAt
    }
  }
`;

export interface IComment {
  __typename: string;
  author: string;
  content: string;
  createdAt: Date;
  id: string;
  postId: string;
  updatedAt: Date;
}

export interface IPost {
  __typename: string;
  commentCount: number;
  comments: Comment[];
  content: string;
  createdAt: Date;
  creatorId: string;
  creatorName: string;
  downvotes: number;
  id: string;
  title: string;
  updatedAt: Date;
  upvotes: number;
}

const CREATE_POST = gql`
  mutation Mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
      creatorName
      commentCount
      upvotes
      downvotes
      comments {
        id
        author
        content
        postId
        createdAt
        updatedAt
      }
      creatorId
      createdAt
      updatedAt
    }
  }
`;

const Home: NextPage = () => {
  const [createPostMutation] = useMutation(CREATE_POST);
  const formik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: async (values) => {
      const { data } = await createPostMutation({
        variables: formik.values,
        refetchQueries: [{ query: GET_POSTS }],
      });
      console.log(data);
      formik.setValues({ title: "", content: "" });
    },
  });
  const [posts, setPosts] = useState<IPost[]>();
  const { loading, data } = useQuery(GET_POSTS, {
    onCompleted: (data) => setPosts(data.getPosts),
  });

  if (loading === true) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <h1>See Latest Posts</h1>
      <div className="flex flex-col">
        <FormInput
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Enter title"
          name="title"
        />
        <textarea
          value={formik.values.content}
          onChange={formik.handleChange}
          placeholder="Enter content"
          name="content"
        />

        <button
          className="bg-blue-500 hover:bg-blue-400 px-4 py-1"
          onClick={formik.submitForm}
        >
          Create Post
        </button>
      </div>
      {posts?.map((post: IPost) => (
        <PostBrief key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Home;
