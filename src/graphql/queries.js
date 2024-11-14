import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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
  query {
    me {
      id
      username
    }
  }
`
