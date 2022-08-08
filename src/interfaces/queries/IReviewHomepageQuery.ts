import { IReviewrQueryHomePage } from "./IReviewrQueryHomePage";

export interface IReviewHomepageQuery {
  id: string;
  reviewr: IReviewrQueryHomePage;
  category: string;
  movieName: string;
  moviePictureUrl: string;
  likes: number;
  deslikes: number;
}
