import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";
import { ReviewrsRepository } from "../adapters/repositories/ReviewsrRepository";
import { IReviewMolde } from "../interfaces/moldes/IReviewMolde";
import { IReviewrQueryHomePage } from "../interfaces/querys/IReviewrQueryHomePage";

import "./styles/MakeReviewPage.scss";

export function MakeReviewPage() {
  const navigate = useNavigate();
  let { movieName } = useParams<{ movieName: string }>();
  movieName = movieName ? movieName : "";

  const [reviewrDataState, setReviewrDataState] =
    useState<IReviewrQueryHomePage | null>(null);

  const [movieNameFieldState, setMovieNameFieldState] = useState(movieName);
  const [movieProfilePictureState, setMovieProfilePictureState] = useState("");
  const [movieCategoryState, setMovieCategoryState] = useState("");
  const [movieReviewState, setMovieReviewState] = useState("");

  async function sendReview(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    try {
      e.preventDefault();
      const reviewMolde: IReviewMolde = {
        movieName: movieNameFieldState,
        review: movieReviewState,
        moviePictureUrl: movieProfilePictureState,
        category: movieCategoryState.toLowerCase(),
        reviewrID: reviewrDataState?.id as string,
      };

      await new ReviewRepository().create(reviewMolde);

      navigate("/homepage/action");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="makeReviewPage">
      <div className="makeReviewFormArea">
        <form>
          <h1>Review</h1>
          <br />
          <input
            type="text"
            placeholder="Movie's Name"
            value={movieNameFieldState}
            onChange={(e) => {
              setMovieNameFieldState(e.target.value);
            }}
            required
          />
          <input
            value={movieProfilePictureState}
            onChange={(e) => {
              setMovieProfilePictureState(e.target.value);
            }}
            type="text"
            placeholder="Movie's Profile Picture"
            required
          />
          <input
            value={movieCategoryState}
            onChange={(e) => {
              setMovieCategoryState(e.target.value);
            }}
            type="text"
            placeholder="Movie's Category (Ex. Action)"
            required
          />
          <textarea
            value={movieReviewState}
            placeholder="Review"
            onChange={(e) => {
              setMovieReviewState(e.target.value);
            }}
            required
          ></textarea>

          <button onClick={sendReview}>Submit</button>
        </form>
      </div>
    </div>
  );
}
