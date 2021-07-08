import {gql} from "@apollo/client";
export const LOAD_USERS = gql`
      query {
        user(id: 1) {
            id
            name
            email
          }
        }
    `
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