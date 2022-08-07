import React from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { GoogleAuthenticator } from "../adapters/Authenticators/Google";
import { IReviewrMolde } from "../interfaces/moldes/IReviewrModel";
import { ReviewrsRepository } from "../adapters/repositories/ReviewsrRepository";

import "./styles/LoginPage.scss";

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="LoginPage">
      <div className="LoginPage__formLoginArea">
        <form>
          <button
            className="googleSiginButton"
            onClick={(e) => getUserInfo(e, navigate)}
          >
            Login with Google
          </button>
          ou
          <button
            className="gitHubSiginButton"
            onClick={(e) => getUserInfo(e, navigate)}
          >
            Login with Github
          </button>
        </form>
      </div>
    </div>
  );
}

async function getUserInfo(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  navigate: NavigateFunction,
) {
  try {
    e.preventDefault();

    const googleAuth = new GoogleAuthenticator();
    const userInfo = await googleAuth.getUserInfo();
    const reviewrMolde: IReviewrMolde = {
      name: userInfo.user.displayName as string,
      avatar: userInfo.user.photoURL,
      reviewrUID: userInfo.user.uid,
    };

    const reviewrsRepository = new ReviewrsRepository();

    const existentReviewr = await reviewrsRepository.findOneByAuthenticatorUID(
      userInfo.user.uid as string,
    );

    if (!existentReviewr) await reviewrsRepository.create(reviewrMolde);

    localStorage.setItem("reviewr_uid", reviewrMolde.reviewrUID);
    navigate("/homepage/action");
  } catch (e) {
    alert(e);
    console.error(e);
  }
}
