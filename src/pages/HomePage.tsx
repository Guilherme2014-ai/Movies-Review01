/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

// Dependences
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { idUniqueV2 } from "id-unique-protocol";

// Interfaces
import { IMovie } from "../interfaces/entities/IMovies";
import { IReviewrQueryHomePage } from "../interfaces/queries/IReviewrQueryHomePage";

// Components
import { NavComponent } from "../components/NavComponent";
import { MovieCardComponent } from "../components/MovieCardComponent";
import { CategoryWrapperComponent } from "../components/CategoryWrapperComponent";

// Statics
import { genres } from "../static/genres";

// Adapters
import { TmdbAPI } from "../adapters/APIs/MovieAPIs/TmdbAPI";

// Hooks
import { useGetUserByIndentifier } from "../hooks/useGetUserByIdentifier";

// CSS
import "./styles/homePage.scss";

export function HomePage() {
  const [reviewrState, setReviewrState] =
    useState<null | IReviewrQueryHomePage>(null);
  const { category_id } = useParams<{ category_id: string }>();
  const [allCategoryMovies, setAllCategoryMovies] = useState<
    IMovie[] | null | undefined
  >(null);

  useEffect(() => {
    getAllCategoryReviews();

    // By ID *
    async function getAllCategoryReviews() {
      console.log("getAllCategoryReviews Func --> Test");

      const movies = await new TmdbAPI().getMoviesByCategory(
        category_id as string,
      );

      setAllCategoryMovies(movies as any as null | undefined);
    }
  }, [category_id]);
  useGetUserByIndentifier(setReviewrState);

  return (
    <div className="Homepage">
      {reviewrState && <NavComponent reviewAvatar={reviewrState.avatarUrl} />}
      <section className="categoriesSection">
        <CategoryWrapperComponent allGenres={genres} />
      </section>
      <section>
        {allCategoryMovies && (
          <div>
            {allCategoryMovies.map((movie) => (
              <div key={idUniqueV2()}>
                <MovieCardComponent
                  title={movie.title}
                  overview={movie.overview}
                  postUrl={movie.image_url}
                  movieId={movie.id}
                  reviewsQuantity={10}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      <br />
      <br />
    </div>
  );
}
