import React, { FunctionComponent } from "react";
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import { FaCommentAlt } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { useRouter } from "next/router";
import { relativeTimeFromDates } from "../utils/formatDateTime";

interface IProps {
  id: string;
  title: string;
  creatorName: string;
  downvotes: number;
  upvotes: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostBrief: FunctionComponent<IProps> = (props) => {
  const router = useRouter();
  return (
    <div
      className="bg-white p-6 rounded-lg  shadow-md text-gray-600 mx-4 my-3 max-w-2xl w-full hover:ring-2 hover:ring-gray-600 hover:cursor-pointer"
      onClick={() => router.push(`/${props.id}`)}
    >
      <div className="flex flex-row justify-between">
        <div>
          posted by{" "}
          <span className="text-gray-700 font-medium">{props.creatorName}</span>
        </div>
        <div className="flex items-center">
          <BiTimeFive className="mr-2" />
          {relativeTimeFromDates(new Date(props.createdAt))}
        </div>
      </div>
      <div className="text-gray-900 text-xl font-semibold mb-4">
        {props.title}
      </div>
      {/* upvotes, downvotes and comments container START */}
      <div className="flex items-center space-x-12">
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
    </div>
  );
};

export default PostBrief;
