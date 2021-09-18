import { useRouter } from "next/router";
import React, { FunctionComponent, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { FaCommentAlt, FaRegBookmark } from "react-icons/fa";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import { relativeTimeFromDates } from "../utils/formatDateTime";
import { FaUserCircle } from "react-icons/fa";
import Comment from "./Comment";
import { gql, useMutation } from "@apollo/client";
import { GET_POST } from "../pages/[postId]";
import { GET_POSTS } from "../pages";

export interface Comment {
  __typename: string;
  author: string;
  content: string;
  createdAt: number;
  id: string;
  postId: string;
  updatedAt: number;
}

export interface IPost {
  __typename: string;
  commentCount: number;
  comments: Comment[];
  content: string;
  createdAt: number;
  creatorId: string;
  creatorName: string;
  downvotes: number;
  id: string;
  title: string;
  updatedAt: number;
  upvotes: number;
}

const ADD_COMMENT = gql`
  mutation Mutation($content: String!, $postId: String!) {
    createComment(content: $content, postId: $postId) {
      id
      author
      content
      postId
      createdAt
      updatedAt
    }
  }
`;

const PostDetails: FunctionComponent<IPost> = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [addCommentMutation] = useMutation(ADD_COMMENT);

  async function addComment() {
    const res = await addCommentMutation({
      variables: { content: comment, postId: props.id },
      update: (cache, { data }) => {
        const postData: any = cache.readQuery({
          query: GET_POST,
          variables: { id: props.id },
        });
        cache.writeQuery({
          query: GET_POST,
          variables: { id: props.id },
          data: {
            getPost: {
              ...postData.getPost,
              comments: [...postData.getPost.comments, data.createComment],
            },
          },
        });
      },
    });
    // console.log(res.data);
    setComment("");
  }

  return (
    <div
      className="bg-white p-6 rounded-lg  shadow-lg text-gray-600 mx-4 my-3 max-w-2xl w-full"
      onClick={() => router.push(`/${props.id}`)}
    >
      <div className="flex flex-row justify-between mb-3">
        <div className="flex items-center">
          <FaUserCircle
            className="mr-2"
            style={{ position: "relative", top: "2px" }}
            size={20}
          />
          <span className="italic">posted by </span>
          <span className="text-gray-700 font-medium ml-2">
            {props.creatorName}
          </span>
        </div>
        <div className="flex items-center">
          <BiTimeFive className="mr-2" />
          {relativeTimeFromDates(new Date(props.createdAt))}
        </div>
      </div>
      <div className="text-gray-900 text-xl font-semibold mb-3">
        {props.title}
      </div>
      <div className="break-words px-2">{`${props.content}`}</div>
      {/* upvotes, downvotes and comments container START */}
      <div className="flex items-center space-x-12 mt-4">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <TiArrowUpOutline size={20} />
            <span className="font-semibold mr-1 text-green-500">
              {props.upvotes}
            </span>{" "}
            <span className="text-gray-500">Upvotes</span>
          </div>
          <div className="flex items-center">
            <TiArrowDownOutline size={20} />
            <span className="font-semibold mr-1 text-red-500">
              {props.downvotes}
            </span>{" "}
            <span className="text-gray-500">Downvotes</span>
          </div>
        </div>
        <div className="flex items-center">
          <FaCommentAlt style={{ position: "relative", top: "2px" }} />{" "}
          <div>
            <span className="font-semibold mx-1 text-yellow-500">
              {props.commentCount}
            </span>{" "}
            Comments
          </div>
        </div>
        <div className="flex items-center">
          <FaRegBookmark style={{ position: "relative", top: "2px" }} />{" "}
          <span className="mx-1">Save</span>
        </div>
      </div>
      <div
        className="hover:underline hover:cursor-pointer text-gray-500 mt-6 mb-2"
        onClick={() => setShowComments(!showComments)}
      >
        See Comments
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <input
            className="focus-within:bg-gray-200 bg-gray-100 w-11/12 px-4 py-0.5 rounded-sm"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
          />
          <button
            className="bg-blue-500 px-2 py-0.5 rounded-sm text-white hover:bg-blue-400"
            onClick={addComment}
          >
            Add
          </button>
        </div>
        {showComments && props.comments.length === 0 ? (
          <h1>No comments</h1>
        ) : (
          props.comments.map((comment) => {
            return <Comment key={comment.id} {...comment} />;
          })
        )}
      </div>
    </div>
  );
};

export default PostDetails;
