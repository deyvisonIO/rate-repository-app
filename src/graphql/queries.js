import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          description
          ownerAvatarUrl
          stargazersCount 
          forksCount
          reviewCount 
          ratingAverage
          language
        }
      }
    }
  }
`

export const GET_REPOSITORY= gql`
  query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      ownerName
      name
      createdAt
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      url
      ownerAvatarUrl
      description
      language
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`


export const ME = gql`
  query($reviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $reviews) {
        edges {
          node {
            id
            user {
              id
              username
            }
            repository {
              name
              ownerName
            }
            userId
            repositoryId
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`
