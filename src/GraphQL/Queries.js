import {gql} from "@apollo/client";
export const LOAD_POSTS = gql `
            query (
          $options: PageQueryOptions
        ) {
          posts(options: $options) {
            data {
              id
              title
              body
            }
            meta {
              totalCount
            }
          }
        }
`
export const LOAD_POST = gql`
    query ($id: ID!){
  post(id: $id) {
    id
    title
    body
  }
}
`
