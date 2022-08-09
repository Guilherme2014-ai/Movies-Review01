import React from "react";
import { useNavigate } from "react-router";

import "./styles/SmallButtonComponent.scss";

export function SmallButtonComponent({
  movieName,
  children,
}: {
  movieName: string;
  children: any;
}) {
  const navigate = useNavigate();

  return (
    <button
      className="smallButton"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/make_review/${movieName}`);
      }}
    >
      {children}
    </button>
  );
}
