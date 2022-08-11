/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router";
import { TmdbAPI } from "../adapters/APIs/MovieAPIs/TmdbAPI";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";
import { MovieReviewCard } from "../components/MovieReviewCard";
import { SmallButtonComponent } from "../components/small/SmallButtonComponent";
import { IMovie } from "../interfaces/entities/IMovies";
import { IReviewHomepageQuery } from "../interfaces/queries/IReviewHomepageQuery";

// CSS
import "./styles/MoviePage.scss";

export function MoviePage() {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [movieDetail, setMovieDetail] = useState<IMovie | null>(null);
  const [movieReviewsState, setMovieReviewsState] = useState<
    IReviewHomepageQuery[] | null
  >(null);

  useGetMoviePageDetailsById(movie_id as string, setMovieDetail);
  useGetReviews(movieDetail, setMovieReviewsState);

  return (
    <div className="MoviePage">
      {movieDetail && (
        <div
          className="MoviePage__moviePost"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetail.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="MoviePage__moviePost__horizontal">
            <div className="MoviePage__moviePost__vertical">
              <div className="MoviePage__moviePost__vertical__content">
                <div>
                  <h1>{movieDetail.title}</h1>
                  <SmallButtonComponent
                    movieName={movieDetail.title}
                    moviePicture={movieDetail.image_url}
                  >
                    Make Review
                  </SmallButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="MoviePage__reviews">
        <div className="MoviePage__moviePost__reviews">
          {movieReviewsState &&
            movieReviewsState.map((movieReview) => {
              return (
                <MovieReviewCard review={movieReview} key={movieReview.id} />
              );
            })}
        </div>
        <br />
      </div>
    </div>
  );
}

function useGetReviews(
  movieDetail: IMovie | null,
  setMovieReviewsState: Dispatch<
    React.SetStateAction<IReviewHomepageQuery[] | null>
  >,
) {
  useEffect(() => {
    getReviews();

    async function getReviews() {
      if (movieDetail) {
        const reviews = await new ReviewRepository().findReviewsIdsByMovieName(
          movieDetail.title,
        );

        setMovieReviewsState(reviews);
      }
    }
  }, [movieDetail]);
}

function useGetMoviePageDetailsById(
  id: string,
  setMovieDetail: React.Dispatch<React.SetStateAction<IMovie | null>>,
) {
  useEffect(() => {
    getMovieDetailsById();

    async function getMovieDetailsById() {
      const movieDetails = await new TmdbAPI().getMovieById(id);

      setMovieDetail(movieDetails);
    }
  }, []);
}
