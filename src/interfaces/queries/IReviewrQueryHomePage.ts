import { IReviewHomepageQuery } from "./IReviewHomepageQuery";

export interface IReviewrQueryHomePage {
  id: string;
  name: string;
  avatarUrl: string;

  reviews: IReviewHomepageQuery[];
}
