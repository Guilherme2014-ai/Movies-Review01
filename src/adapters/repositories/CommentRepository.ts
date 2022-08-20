import { apolloClient } from "../../libs/apolloClient";
import { ICommentMolde } from "../../interfaces/moldes/ICommentMolde";
import { gql } from "@apollo/client";

export class CommentRepository {
  async create(commentMolde: ICommentMolde) {
    const commentCreated = await apolloClient.mutate({
      mutation: gql`
        mutation MyMutation(
          $reviewrId: ID!
          $reviewId: ID!
          $commentText: String!
        ) {
          createComment(
            data: {
              reviewr: { connect: { id: $reviewrId } }
              review: { connect: { id: $reviewId } }
              commentText: $commentText
            }
          ) {
            id
          }
        }
      `,
      variables: {
        reviewrId: commentMolde.reviewr,
        reviewId: commentMolde.review,
        commentText: commentMolde.commentText,
      },
    });

    console.log(commentCreated);

    await apolloClient.mutate({
      mutation: gql`
        mutation MyMutation {
          publishManyComments(to: PUBLISHED) {
            count
          }
        }
      `,
    });
  }
}
