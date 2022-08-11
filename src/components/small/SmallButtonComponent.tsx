import React from "react";
import { useNavigate } from "react-router";

import "./styles/SmallButtonComponent.scss";

export function SmallButtonComponent({
  moviePicture,
  movieName,
  children,
}: {
  moviePicture: string;
  movieName: string;
  children: any;
}) {
  const navigate = useNavigate();

  return (
    <button
      className="smallButton"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/make_review/${movieName}${moviePicture}`);
      }}
    >
      {children}
    </button>
  );
}
