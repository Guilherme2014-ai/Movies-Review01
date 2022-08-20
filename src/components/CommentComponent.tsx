import React from "react";

// Components
import { Avatar } from "@mui/material";

// Interfaces
import { IComment } from "../interfaces/queries/ICommentQuery";

// CSS
import "./styles/CommentComponent.scss";

export function CommentComponent({ commentInfo }: { commentInfo: IComment }) {
  return (
    <div className="commentContainer">
      <div className="comment">
        <header>
          <Avatar src={commentInfo.reviewr.avatarUrl} />
          <span>{commentInfo.reviewr.name}</span>
        </header>
        <p>{commentInfo.commentText}</p>
      </div>
    </div>
  );
}
