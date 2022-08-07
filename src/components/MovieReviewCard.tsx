import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";
import { IReviewHomepageQuery } from "../interfaces/querys/IReviewHomepageQuery";
import LikeComponent from "./icons/LikeComponent";
import DeslikeComponent from "./icons/LikeComponent copy";

import "./styles/MovieReview.scss";

export function MovieReviewCard({ review }: { review: IReviewHomepageQuery }) {
  const navigate = useNavigate();

  return (
    <div className="MovieReviewArea">
      <div
        className="movieReview"
        onClick={() => {
          navigate(`/review/${review.id}`);
        }}
      >
        <div
          className="movieImage"
          style={{
            backgroundImage: `url(${review.moviePictureUrl})`,
          }}
        ></div>
        <div className="content">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/make_review/${review.movieName}`);
            }}
          >
            Make a Review
          </button>
          <div className="rates">
            <LikeComponent
              onClickFunc={(e: any) => {
                e.stopPropagation();
                feedbackReview(true, review);
              }}
            />
            <DeslikeComponent
              onClickFunc={(e: any) => {
                e.stopPropagation();
                feedbackReview(false, review);
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
