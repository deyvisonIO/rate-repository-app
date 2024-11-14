import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export function ItemSeparator() {
  return <View style={styles.separator} />;
}

function RepositoryList() {
  const { data, loading, setSorting } = useRepositories();
  const [sortValue, setSortValue] = useState("latest");
  
  function handleSortValueChange(value) {
    setSortValue(value);
    setSorting(value);
  }

  if(loading) return null;

  const repositories = data?.repositories;
  // TODO: pass sort as prop and render a sort picker as FlatList header
  return <RepositoryListContainer repositories={repositories} order={sortValue} setOrder={handleSortValueChange} set/>
}

function RepositorySortPicker({ selectedValue, onValueChange }) {
  return (
    <Picker selectedValue={selectedValue} onValueChange={(value) => onValueChange(value)}>
      <Picker.Item label="Latest Repositories" value="latest" />
      <Picker.Item label="Highest Rated Respositories" value="highestRated" />
      <Picker.Item label="Lowest Rated Respositories" value="lowestRated" />
    </Picker>
  )
}

export function RepositoryListContainer({ repositories, order, setOrder}) {
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
      ListHeaderComponent={() => <RepositorySortPicker selectedValue={order} onValueChange={setOrder} />}
    />
  )
}

export default RepositoryList;
