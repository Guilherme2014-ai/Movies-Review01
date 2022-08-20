import { IComment } from "./ICommentQuery";
import { IReviewrQueryHomePage } from "./IReviewrQueryHomePage";

export interface IReviewHomepageQuery {
  id: string;
  reviewr: IReviewrQueryHomePage;
  category?: string;
  reviewText?: string;
  movieName: string;
  moviePictureUrl: string;
  likes: number;
  deslikes: number;
  comments?: IComment[];
}
