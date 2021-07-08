import {gql} from "@apollo/client";
export const CREATE_POST_INPUT = gql`
    mutation (
      $input: CreatePostInput!
    ) {
      createPost(input: $input) {
        id
        title
        body
      }
    }
`;