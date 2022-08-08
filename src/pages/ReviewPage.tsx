import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";
import LikeComponent from "../components/icons/LikeComponent";
import DeslikeComponent from "../components/icons/LikeComponent copy";
import { IReviewHomepageQuery } from "../interfaces/queries/IReviewHomepageQuery";

interface IReviewpageQuery extends IReviewHomepageQuery {
  id: string;
  likes: number;
  deslikes: number;
  reviewText: string;
}

import "./styles/reviewPage.scss";

export function ReviewPage() {
  const { review_id } = useParams<{ review_id: string }>();

  const [likeCounterState, setLikeCounterState] = useState<
    null | number | undefined
  >(0);
  const [deslikeCounterState, setDesLikeCounterState] = useState<
    null | number | undefined
  >(0);

  const [reviewDataState, setReviewDataState] = useState<
    IReviewpageQuery | null | undefined
  >(null);

  useEffect(() => {
    setLikeCounterState(reviewDataState?.likes);
    setDesLikeCounterState(reviewDataState?.deslikes);
  }, [reviewDataState]);

  useEffect(() => {
    setReviewData();
    async function setReviewData() {
      const review = await new ReviewRepository().findReviewByID(
        review_id as string,
      );

      setReviewDataState(review as IReviewpageQuery);
    }
  }, []);

  return (
    <div className="reviewPage">
      <div className="content">
        <div className="review">
          <div className="titleAndImage">
            <img src={reviewDataState?.moviePictureUrl} alt="review avatar" />
            <div>
              <div>
                <h1>{reviewDataState?.movieName}</h1>
                <p>{reviewDataState?.reviewText}</p>
              </div>
              <div className="feedback">
                <div>
                  <LikeComponent
                    onClickFunc={(e) => {
                      e.stopPropagation();
                      feedbackReview(true, reviewDataState as IReviewpageQuery);
                      setLikeCounterState((e) => (e as any) + 1);
                    }}
                  />{" "}
                  {likeCounterState}
                </div>
                <div>
                  <DeslikeComponent
                    onClickFunc={(e) => {
                      e.stopPropagation();
                      feedbackReview(
                        false,
                        reviewDataState as IReviewpageQuery,
                      );
                      setDesLikeCounterState((e) => (e as any) + 1);
                    }}
                  />{" "}
                  {deslikeCounterState}
                </div>
              </div>
            </div>
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
