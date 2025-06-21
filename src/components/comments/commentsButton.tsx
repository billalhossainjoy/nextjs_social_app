import React from "react";
import { PostData } from "@/types";
import { MessageSquare } from "lucide-react";

interface Props {
  post: PostData;
  onClick: () => void;
}

const CommentsButton: React.FC<Props> = ({ post, onClick }) => {
  return (
    <button onClick={onClick} className={"flex items-center my-2"}>
      <MessageSquare className={"size-5"} />
      <span className={"ml-1 text-sm"}>
        {post._count.comments}{" "}
        <span className={"hidden sm:inline"}>comments</span>
      </span>
    </button>
  );
};

export default CommentsButton;
