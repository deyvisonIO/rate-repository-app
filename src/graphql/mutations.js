import { gql } from "@apollo/client"

export const AUTHENTICATE = gql`
mutation($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`

export const CREATE_USER = gql`
mutation($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
    createdAt
    reviewCount
  }
}
`

export const CREATE_REVIEW = gql`
mutation($review: CreateReviewInput) {
  createReview(review: $review) {
    id 
    repository {
      id
    }
  }
}
`



export const DELETE_REVIEW = gql`
mutation($reviewId: ID!) {
  deleteReview(id: $reviewId)
}
`
