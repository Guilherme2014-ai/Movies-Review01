/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";
import { IReviewHomepageQuery } from "../interfaces/queries/IReviewHomepageQuery";
import LikeComponent from "./icons/LikeComponent";
import DeslikeComponent from "./icons/LikeComponent copy";

import "./styles/MovieReview.scss";

export function MovieReviewCard({
  review,
  isLiked,
  isUnliked,
  onLikeFunc,
  onUnlikeFunc,
}: {
  review: IReviewHomepageQuery;
  isLiked: boolean;
  isUnliked: boolean;
  onLikeFunc: (reviewId: string) => void;
  onUnlikeFunc: (reviewId: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="MovieReviewArea">
      <div
        className="movieReview"
        onClick={() => {
          navigate(
            `/review/${review.id}/${isLiked ? "true" : "false"}/${
              isUnliked ? "true" : "false"
            }`,
          );
        }}
      >
        <div
          className="movieImage"
          style={{
            backgroundImage: `url(${review.moviePictureUrl})`,
          }}
        ></div>
        <div className="content">
          <p>{review.reviewText?.substring(0, 80)}...</p>
          <div className="rates">
            <LikeComponent
              isLiked={isLiked}
              onClickFunc={(e: any) => {
                e.stopPropagation();
                feedbackReview(true, review); // estanho
                onLikeFunc(review.id);
              }}
            />
            <DeslikeComponent
              isUnliked={isUnliked}
              onClickFunc={(e: any) => {
                e.stopPropagation();
                feedbackReview(false, review);
                onUnlikeFunc(review.id);
              }}
            />
          </div>
          <h1>{review.movieName}</h1>
          <div className="reviewr">
            <Avatar src={review.reviewr.avatarUrl} />{" "}
            <span>{review.reviewr.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

async function feedbackReview(positive: boolean, review: IReviewHomepageQuery) {
  try {
    let oldQuantity = 0;

    if (positive) {
      oldQuantity = review.likes + 1;

      await new ReviewRepository().updateLikes(oldQuantity, review.id);
    } else {
      oldQuantity = review.deslikes + 1;

      await new ReviewRepository().updateDeslikes(oldQuantity, review.id);
    }
  } catch (e) {
    console.error(e);
  }
}
