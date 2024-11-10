import { FlatList, View, StyleSheet } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function RepositoryList() {
  const { data, loading } = useRepositories();


  if(loading) return null;

  // Get the nodes from the edges array
  const repositoryNodes = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => <RepositoryItem {...props} />}
    />
  );
}

export default RepositoryList;
