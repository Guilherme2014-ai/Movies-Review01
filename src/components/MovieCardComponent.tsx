import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";
import { SmallButtonComponent } from "./small/SmallButtonComponent";

// CSS
import "./styles/MovieCardComponent.scss";

export function MovieCardComponent({
  title,
  overview,
  postUrl,
  movieId,
}: {
  title: string;
  overview: string;
  reviewsQuantity: number;
  postUrl: string;
  movieId: string;
}) {
  const navigate = useNavigate();
  const [reviewsState, setReviewsState] = useState<{ id: string }[] | null>(
    null,
  );

  useEffect(() => {
    loadReviews();

    async function loadReviews() {
      const reviews = await new ReviewRepository().findReviewsIdsByMovieName(
        title,
      );

      setReviewsState(reviews);
    }
  }, []);

  return (
    <div className="MovieCardArea">
      {reviewsState && (
        <div
          className="MovieCard"
          onClick={() => {
            navigate(`/movie/${movieId}`);
          }}
        >
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${postUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="MovieCard__post"
          ></div>
          <div className="MovieCard__content">
            <h1>{title}</h1>
            <p>{overview}</p>
            <br />
            <SmallButtonComponent movieName={title}>
              Make a Review
            </SmallButtonComponent>
            <br />
            <br />
            {reviewsState.length} Reviews
          </div>
        </div>
      )}
    </div>
  );
}
