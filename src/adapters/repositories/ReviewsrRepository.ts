import { gql } from "@apollo/client";
import { apolloClient } from "../../libs/apolloClient";
import { IReviewrMolde } from "../../interfaces/moldes/IReviewrModel";
import { IReviewrQueryHomePage } from "../../interfaces/queries/IReviewrQueryHomePage";

export class ReviewrsRepository {
  async create(reviewr: IReviewrMolde) {
    await apolloClient.mutate({
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
        mutation publishManyReviewrs {
          publishManyReviewrs(to: PUBLISHED) {
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
        query findOneReviewr($authenticatorId: String!) {
          reviewr(where: { authenticatorId: $authenticatorId }) {
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
        authenticatorId: authenticatorUID,
      },
    });

    return queryResult.data.reviewr;
  }
}
