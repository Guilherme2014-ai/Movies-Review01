import React from "react";
import { NavigateFunction, useNavigate } from "react-router";

// Interfaces
import { IReviewrMolde } from "../interfaces/moldes/IReviewrModel";

// Adpaters
import { ReviewrsRepository } from "../adapters/repositories/ReviewsrRepository";
import { GoogleAuthenticator } from "../adapters/Authenticators/Google";

// CSS
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
    const reviewrsRepository = new ReviewrsRepository();

    const userInfo = await googleAuth.getUserInfo();

    const existentReviewr = await reviewrsRepository.findOneByAuthenticatorUID(
      userInfo.user.uid as string,
    );

    if (!existentReviewr) {
      const reviewrMolde: IReviewrMolde = {
        name: userInfo.user.displayName as string,
        avatar: userInfo.user.photoURL,
        reviewrUID: userInfo.user.uid,
      };

      await reviewrsRepository.create(reviewrMolde);
    }

    localStorage.setItem("reviewr_uid", userInfo.user.uid);
    navigate("/homepage/28");
  } catch (e) {
    alert(e);
    console.error(e);
  }
}
