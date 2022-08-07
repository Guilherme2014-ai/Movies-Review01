import React from "react";
import { useNavigate, useParams } from "react-router";

// CSS
import "./styles/CategoryWrapperComponent.scss";

const categories = [
  {
    name: "Action",
    slug: "action",
  },
  {
    name: "Drama",
    slug: "drama",
  },
  {
    name: "Romance",
    slug: "romance",
  },
  {
    name: "Suspence",
    slug: "suspence",
  },
];

export function CategoryWrapperComponent() {
  const navigate = useNavigate();
  const { category_slug } = useParams<{ category_slug: string }>();

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
        {categories.map((category) => {
          return (
            <div
              className="categoryCard"
              key={category.slug}
              style={{
                backgroundColor:
                  category_slug == category.slug ? "#5C24D3" : "",
              }}
              onClick={() => {
                navigate(`/homepage/${category.slug}`);
              }}
            >
              <h1>{category.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
