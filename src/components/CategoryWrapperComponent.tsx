import React from "react";
import { useNavigate, useParams } from "react-router";
import { IGenre } from "../interfaces/entities/IGenre";

// CSS
import "./styles/CategoryWrapperComponent.scss";

export function CategoryWrapperComponent({
  allGenres,
}: {
  allGenres: IGenre[];
}) {
  const navigate = useNavigate();
  const { category_id } = useParams<{ category_id: string }>();

  return (
    <div className="categoryListArea">
      <div
        className="categoryList"
        id="categoryList"
        onWheel={(e) => {
          const jump = 60;
          const element = document.getElementById("categoryList");
          const isWheelPositive = e.deltaY > 0;

          element?.scrollBy(isWheelPositive ? jump : -jump, 0);
        }}
      >
        {allGenres.map((category) => {
          return (
            <div
              className="categoryCard"
              key={category.id}
              style={{
                backgroundColor:
                  category_id == `${category.id}` ? "#5C24D3" : "",
              }}
              onClick={() => {
                navigate(`/homepage/${category.id}`);
              }}
            >
              <h1>{`${category.name.substring(0, 6)}${
                category.name.length > 6 ? "..." : ""
              }`}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
