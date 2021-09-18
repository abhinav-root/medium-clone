import React, { FunctionComponent } from "react";
import { BiTimeFive } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { relativeTimeFromDates } from "../utils/formatDateTime";

interface IProp {
  __typename: string;
  author: string;
  content: string;
  createdAt: number;
  id: string;
  postId: string;
  updatedAt: number;
}

const Comment: FunctionComponent<IProp> = (props) => {
  return (
    <div>
      <div className="flex items-center">
        <FaUserCircle
          className="mr-1"
          size={14}
          style={{ position: "relative", top: "2px" }}
        />
        {props.author}
        <div className="flex items-center ml-4 text-sm">
          <BiTimeFive className="mr-1" />
          {relativeTimeFromDates(new Date(props.createdAt))}
        </div>
      </div>
      <div className="ml-4 text-sm text-gray-500">{props.content}</div>
    </div>
  );
};

export default Comment;
