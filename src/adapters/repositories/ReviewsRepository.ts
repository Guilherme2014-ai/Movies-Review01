import { apolloClient } from "../../libs/apolloClient";
import { gql } from "@apollo/client";
import { IReviewHomepageQuery } from "../../interfaces/queries/IReviewHomepageQuery";
import { IReviewMolde } from "../../interfaces/moldes/IReviewMolde";

export class ReviewRepository {
  async create(reviewMolde: IReviewMolde) {
    try {
      const { movieName, review, category, moviePictureUrl, reviewrID } =
        reviewMolde;

      await apolloClient.mutate({
        mutation: gql`
          mutation createReview(
            $movieName: String!
            $reviewText: String!
            $category: String!
            $moviePictureUrl: String
            $reviewrID: ID!
          ) {
            createReview(
              data: {
                movieName: $movieName
                reviewText: $reviewText
                moviePictureUrl: $moviePictureUrl
                likes: 0
                deslikes: 0
                category: $category
                reviewr: { connect: { id: $reviewrID } }
              }
            ) {
              movieName
            }
          }
        `,
        variables: {
          movieName,
          reviewrID,
          reviewText: review,
          category: category,
          moviePictureUrl,
        },
      });

      await apolloClient.mutate({
        mutation: gql`
          mutation publishReviews {
            publishManyReviews(to: PUBLISHED) {
              count
            }
          }
        `,
      });
    } catch (e) {
      console.error(e);
    }
  }
  async findReviewsIdsByMovieName(movieName: string) {
    try {
      const reviews = await apolloClient.query<{
        reviews: IReviewHomepageQuery[];
      }>({
        query: gql`
          query findReviewsIdsByMovieName($movieName: String!) {
            reviews(where: { movieName: $movieName }) {
              id
              movieName
              moviePictureUrl
              category
              reviewText
              likes
              deslikes

              reviewr {
                name
                avatarUrl
              }
            }
          }
        `,
        variables: {
          movieName,
        },
      });

      const reviewsIds = reviews.data.reviews;

      return reviewsIds;
    } catch (e) {
      throw e;
    }
  }
  async findAllCategoryReviews(categorySlug: string) {
    console.log(categorySlug);
    const allReviews = await apolloClient.mutate<{
      reviews: IReviewHomepageQuery[];
    }>({
      mutation: gql`
        query findAllCategoryReviews($categorySlug: String!) {
          reviews(where: { category: $categorySlug }) {
            id
            movieName
            moviePictureUrl
            category
            likes
            deslikes

            reviewr {
              name
              avatarUrl
            }
          }
        }
      `,
      variables: {
        categorySlug,
      },
    });

    return allReviews.data?.reviews;
  }
  async findReviewByID(reviewId: string) {
    const allReviews = await apolloClient.mutate<{
      review: IReviewHomepageQuery;
    }>({
      mutation: gql`
        query findAllCategoryReviews($reviewId: ID!) {
          review(where: { id: $reviewId }) {
            id
            movieName
            moviePictureUrl
            category
            likes
            deslikes
            reviewText
            comments {
              reviewr {
                id
                name
                avatarUrl
              }
              commentText
            }

            reviewr {
              name
              avatarUrl
            }
          }
        }
      `,
      variables: {
        reviewId,
      },
    });

    return allReviews.data?.review;
  }

  async updateLikes(value: number, reviewId: string) {
    await apolloClient.mutate({
      mutation: gql`
        mutation updateLikes($value: Int!, $reviewId: ID!) {
          updateReview(data: { likes: $value }, where: { id: $reviewId }) {
            movieName
          }
        }
      `,
      variables: {
        value,
        reviewId,
      },
    });

    await apolloClient.mutate({
      mutation: gql`
        mutation publishManyReviews {
          publishManyReviews(to: PUBLISHED) {
            count
          }
        }
      `,
    });
  }

  async updateDeslikes(value: number, reviewId: string) {
    await apolloClient.mutate({
      mutation: gql`
        mutation updateLikes($value: Int!, $reviewId: ID!) {
          updateReview(data: { deslikes: $value }, where: { id: $reviewId }) {
            movieName
          }
        }
      `,
      variables: {
        value,
        reviewId,
      },
    });

    await apolloClient.mutate({
      mutation: gql`
        mutation publishManyReviews {
          publishManyReviews(to: PUBLISHED) {
            count
          }
        }
      `,
    });
  }
}
