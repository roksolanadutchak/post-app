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
export const LOAD_USERS = gql`
query (
  $options: PageQueryOptions
) {
  users(options: $options) {
    data {
      id
      username
    }
    meta {
      totalCount
    }
  }
}
`
export const LOAD_USER = gql`
query ($id: ID!){
  user(id: $id) {
    id
    username
    email
    address {
      geo {
        lat
        lng
      }
    }
  }
}
`
export const LOAD_USER_POSTS = gql`
query ($id: ID!){
  user(id: $id) {
    posts {
      data {
        id
        title
        body
      }
    }
  }
}
`