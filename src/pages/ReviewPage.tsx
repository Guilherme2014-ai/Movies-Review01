/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { idUniqueV2 } from "id-unique-protocol";
import { useParams } from "react-router";

// Adapters
import { CommentRepository } from "../adapters/repositories/CommentRepository";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";

// Hooks
import { useGetUserByIndentifier } from "../hooks/useGetUserByIdentifier";

// Components
import { CommentComponent } from "../components/CommentComponent";
import LikeComponent from "../components/icons/LikeComponent";
import DeslikeComponent from "../components/icons/LikeComponent copy";

// Interfaces
import { IReviewrQueryHomePage } from "../interfaces/queries/IReviewrQueryHomePage";
import { IReviewHomepageQuery } from "../interfaces/queries/IReviewHomepageQuery";
import { ICommentMolde } from "../interfaces/moldes/ICommentMolde";
interface IReviewpageQuery extends IReviewHomepageQuery {
  id: string;
  likes: number;
  deslikes: number;
  reviewText: string;
}

// CSS
import "./styles/reviewPage.scss";

/*
posso separar as insformações do review, e os comentarios do review, assim podendo tornar os comentarios um
state a parte, nao precisando manipular o state de um review inteiro.

lição *
*/

export function ReviewPage() {
  const {
    review_id,
    liked: stringLiked,
    unliked: stringunLiked,
  } = useParams<{
    review_id: string;
    liked: string;
    unliked: string;
  }>();

  const liked = stringLiked == "true";
  const unliked = stringunLiked == "true";

  const [reviewrState, setReviewrState] =
    useState<null | IReviewrQueryHomePage>(null);
  const [commentFieldState, setCommentFieldState] = useState("");

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
  useGetUserByIndentifier(setReviewrState);
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
                    isLiked={liked}
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
                    isUnliked={unliked}
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
              <div className="commentArea">
                <form>
                  <input
                    type="text"
                    name="commentField"
                    id="commentField"
                    className="commentField"
                    placeholder="Write a Comment !"
                    value={commentFieldState}
                    onChange={(e) => {
                      e.preventDefault();
                      const value = e.target.value;

                      setCommentFieldState(value);
                    }}
                    onKeyDown={(e) =>
                      sendComment(
                        e,
                        reviewrState,
                        reviewDataState,
                        commentFieldState,
                        setCommentFieldState,
                      )
                    }
                  />
                </form>
                <div className="comments">
                  {reviewDataState?.comments?.map((comment) => {
                    return (
                      <CommentComponent
                        commentInfo={comment}
                        key={idUniqueV2()}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function sendComment(
  e: React.KeyboardEvent<HTMLInputElement>,
  reviewrState: IReviewrQueryHomePage | null,
  reviewState: IReviewpageQuery | null | undefined,
  commentField: string,
  setCommentField: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const key = e.key;

    if (key == "Enter") {
      e.preventDefault();

      const commentMolde: ICommentMolde = {
        commentText: commentField,
        reviewr: reviewrState?.id as string,
        review: reviewState?.id as string,
      };

      setCommentField("");
      await new CommentRepository().create(commentMolde);
    }
  } catch (e) {
    alert(e);
    console.error(e);
  }
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
