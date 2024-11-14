import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useState } from "react";

export default function useRepositories() {
  const [sort, setSort] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: sort.orderBy,
      orderDirection: sort.orderDirection,
    },
  });

  function setSorting(value) {
    switch(value) {
      case "latest":
        latestRepositories()
        return;
      case "highestRated":
        highestRatedRepositories()
        return;
      case "lowestRated":
        lowestRatedRepositories()
        return;
    }
  }

  function latestRepositories() {
    setSort({
      orderBy: "CREATED_AT",
      orderDirection: "DESC"
    })
  }
  function highestRatedRepositories() {
    setSort({
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC"
    })
  }
  function lowestRatedRepositories() {
    setSort({
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC"
    })
  }

  return { data, loading, refetch, sort, setSorting };
}
