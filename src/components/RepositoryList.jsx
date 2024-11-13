import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export function ItemSeparator() {
  return <View style={styles.separator} />;
}

function RepositoryList() {
  const { data, loading } = useRepositories();

  if(loading) return null;

  const repositories = data?.repositories;

  return <RepositoryListContainer repositories={repositories}/>
}

export function RepositoryListContainer({ repositories }) {
  // Get the nodes from the edges array
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge => edge.node)
    : [];

  const navigate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <Pressable onPress={() => navigate("/" + props.item.id)}>
          <RepositoryItem {...props} />
        </Pressable>
      )}
    />
  )
}

export default RepositoryList;
