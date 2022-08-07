import React, { useEffect, useState } from "react";
import { idUniqueV2 } from "id-unique-protocol";
import { useNavigate } from "react-router";
import { ReviewrsRepository } from "../adapters/repositories/ReviewsrRepository";
import { CategoryWrapperComponent } from "../components/CategoryWrapperComponent";
import { MovieReviewCard } from "../components/MovieReviewCard";
import { NavComponent } from "../components/NavComponent";
import { IReviewrQueryHomePage } from "../interfaces/querys/IReviewrQueryHomePage";

import "./styles/homePage.scss";
import { ReviewRepository } from "../adapters/repositories/ReviewsRepository";
import { useParams } from "react-router";
import { IReviewHomepageQuery } from "../interfaces/querys/IReviewHomepageQuery";

export function HomePage() {
  const navigate = useNavigate();
  const [reviewrState, setReviewrState] =
    useState<null | IReviewrQueryHomePage>(null);
  const { category_slug } = useParams<{ category_slug: string }>();
  const [allCategoryMovies, setAllCategoryMovies] = useState<
    IReviewHomepageQuery[] | null | undefined
  >(null);

  useEffect(() => {
    getAllCategoryReviews();

    async function getAllCategoryReviews() {
      const reviews = await new ReviewRepository().findAllCategoryReviews(
        category_slug as string,
      );

      setAllCategoryMovies(reviews);
    }
  }, [category_slug]);

  useEffect(() => {
    const reviewAuthIdentifier = localStorage.getItem("reviewr_uid");

    if (!reviewAuthIdentifier) {
      navigate("/login");
    } else {
      getReviewrData();
    }

    async function getReviewrData() {
      const reviewrRepository =
        await new ReviewrsRepository().findOneByAuthenticatorUID(
          reviewAuthIdentifier as string,
        );

      setReviewrState(reviewrRepository);
    }
  }, []);

  console.log(reviewrState?.avatarUrl);

  return (
    <div className="Homepage">
      {reviewrState && <NavComponent reviewAvatar={reviewrState.avatarUrl} />}
      <section className="categoriesSection">
        <CategoryWrapperComponent />
      </section>
      <section>
        {allCategoryMovies && (
          <div>
            {allCategoryMovies.map((review) => {
              return <MovieReviewCard review={review} key={idUniqueV2()} />;
            })}
          </div>
        )}
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
