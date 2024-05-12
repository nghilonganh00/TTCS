import React, { useState } from "react";

import { Timestamp } from "../../../util/date";
import CommentAPI from "../../../API/commentAPI";

interface Comment {
  userName: string;
  createdAt: {
    seconds: string;
    nanosecond: string;
  };
  content: string;
}

interface CommentAreaProps {
  list: Comment[];
  handleAddComment: (content: string) => void;
}

const CommentItem: React.FC<Comment> = (props) => {
  const { userName, createdAt, content } = props;

  const createdAtString = Timestamp.toString(createdAt);
  return (
    <div className="flex gap-2">
      <div className="rounded-full w-9 h-9 bg-blue-600"></div>
      <div className="w-5/6">
        <h3>{`${userName}, ${createdAtString}`}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

const CommentArea: React.FC<CommentAreaProps> = (props) => {
  const { handleAddComment } = props;
  const [newComment, setNewComment] = useState<string>("");
  const { list } = props;

  const handleOnChangeNewComment = async (content: string) => {
    setNewComment(content);
  };

  return (
    <div className="bg-white rounded-md space-y-5 mt-6 mb-44">
      <h3 className="text-lg font-semibold">Bình luận</h3>
      <div className="flex flex-col items-end gap-4">
        <textarea
          name=""
          id=""
          className="w-full h-12 p-2 border"
          placeholder="Chia sẻ cảm nghĩ của bạn"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div
          onClick={() => handleAddComment(newComment)}
          className="text-white font-semibold text-base bg-blue-800 border-2 border-gray-300 focus:outline-none 
                    rounded-lg px-6 py-2 me-2 mb-2 hover:text-white hover:bg-blue-900 focus: cursor-pointer"
        >
          Gửi
        </div>
      </div>

      <div className="w-full border-t border-solid border-gray-600"></div>

      <div className="space-y-4">
        {list?.map((comment: Comment, key) => {
          const { userName, createdAt, content } = comment;
          return (
            <CommentItem
              userName={userName}
              createdAt={createdAt}
              content={content}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentArea;
