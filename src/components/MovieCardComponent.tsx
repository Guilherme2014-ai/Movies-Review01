import React from "react";

// CSS
import "./styles/MovieCardComponent.scss";

export function MovieCardComponent({
  title,
  overview,
  reviewsQuantity,
  postUrl,
}: {
  title: string;
  overview: string;
  reviewsQuantity: number;
  postUrl: string;
}) {
  return (
    <div className="MovieCardArea">
      <div className="MovieCard">
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
          {reviewsQuantity} Reviews
        </div>
      </div>
    </div>
  );
}
