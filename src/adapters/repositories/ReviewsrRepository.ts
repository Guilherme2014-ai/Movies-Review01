import { gql } from "@apollo/client";
import { apolloClient } from "../../libs/apolloClient";
import { IReviewrMolde } from "../../interfaces/moldes/IReviewrModel";
import { IReviewrQueryHomePage } from "../../interfaces/queries/IReviewrQueryHomePage";

export class ReviewrsRepository {
  async create(reviewr: IReviewrMolde) {
    const reviewrCreated = await apolloClient.mutate({
      mutation: gql`
        mutation createNewReviewr(
          $reviewrName: String!
          $authenticatorId: String!
          $avatarUrl: String
        ) {
          createReviewr(
            data: {
              name: $reviewrName
              authenticatorId: $authenticatorId
              avatarUrl: $avatarUrl
            }
          ) {
            id
            name
          }
        }
      `,
      variables: {
        reviewrName: reviewr.name,
        authenticatorId: reviewr.reviewrUID,
        avatarUrl: reviewr.avatar,
      },
    });

    await apolloClient.mutate({
      mutation: gql`
        mutation publishReviewsr {
          publishManyReviews(to: PUBLISHED) {
            count
          }
        }
      `,
    });
  }
  async findOneByAuthenticatorUID(authenticatorUID: string) {
    const queryResult = await apolloClient.query<{
      reviewr: IReviewrQueryHomePage;
    }>({
      query: gql`
        query findOneReviewr {
          reviewr(where: { authenticatorId: "wJLHCzSvWfchn6P8J6cx1F0bAoy2" }) {
            id
            name
            avatarUrl

            reviews {
              movieName
              moviePictureUrl

              reviewr {
                name
                avatarUrl
              }
            }
          }
        }
      `,
      variables: {
        reviewrEmail: authenticatorUID,
      },
    });

    return queryResult.data.reviewr;
  }
}
