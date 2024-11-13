import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#24292e",
  },
  text: {
    color: "#ffffff",
  },
  tab: {
    marginHorizontal: 10,
  }
});

export default function AppBar() {
  const { data, loading } =  useQuery(ME); 

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab link="/" content="Repositories" />
        {!loading && !data?.me?.username && <Tab link="/sign-in" content="Sign In" />}
        {!loading && data?.me?.username && <Tab link="/create-review" content="Create Review" />}
        {!loading && data?.me?.username && <Tab link="/sign-out" content="Sign Out" />}
      </ScrollView>
    </View>
  );
}

function Tab(props) {
  return (
    <Pressable style={styles.tab} onPress={props.onPress}>
      <Link to={props.link}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
          {props.content}
        </Text>
      </Link>
    </Pressable>
  );
}
