import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white"
  },
});

export function ItemSeparator() {
  return <View style={styles.separator} />;
}

function RepositoryList() {
  const { data, setSorting, search, setSearch, fetchMore } = useRepositories({ first: 3 });
  const [sortValue, setSortValue] = useState("latest");

  function handleSortValueChange(value) {
    setSortValue(value);
    setSorting(value);
  }

  const repositories = data?.repositories;
  // TODO: pass sort as prop and render a sort picker as FlatList header
  return (
    <RepositoryListContainer
      repositories={repositories}
      order={sortValue}
      setOrder={handleSortValueChange}
      search={search}
      setSearch={setSearch}
      onEndReach={fetchMore}
    />
  );
}

function RepositorySortPicker({ selectedValue, onValueChange }) {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(value) => onValueChange(value)}
    >
      <Picker.Item label="Latest Repositories" value="latest" />
      <Picker.Item label="Highest Rated Respositories" value="highestRated" />
      <Picker.Item label="Lowest Rated Respositories" value="lowestRated" />
    </Picker>
  );
}

function SearchRepositories({ search, setSearch }) {
  return (
    <TextInput
      style={styles.input} 
      value={search}
      onChangeText={setSearch}
    />
  );
}

export function RepositoryListContainer({
  repositories,
  order,
  setOrder,
  search,
  setSearch,
  onEndReach
}) {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

  return (
    <>
      <SearchRepositories search={search} setSearch={setSearch} />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(props) => (
          <Pressable onPress={() => navigate("/" + props.item.id)}>
            <RepositoryItem {...props} />
          </Pressable>
        )}
        ListHeaderComponent={() => (
          <>
            <RepositorySortPicker
              selectedValue={order}
              onValueChange={setOrder}
            />
          </>
        )}
        onEndReached={onEndReach}
      />
    </>
  );
}

export default RepositoryList;
