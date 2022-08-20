import React, { useEffect } from "react";
import { useNavigate } from "react-router";

// Adapters
import { ReviewrsRepository } from "../adapters/repositories/ReviewsrRepository";
import { IReviewrQueryHomePage } from "../interfaces/queries/IReviewrQueryHomePage";

export function useGetUserByIndentifier(
  setReviewrState: React.Dispatch<
    React.SetStateAction<IReviewrQueryHomePage | null>
  >,
) {
  const navigate = useNavigate();

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
}
