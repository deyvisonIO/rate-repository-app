import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab link="/" content="Repositories" />
        <Tab link="/sign-in" content="Sign In" />
      </ScrollView>
    </View>
  );
}

function Tab(props) {
  return (
    <Pressable style={styles.tab}>
      <Link to={props.link}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
          {props.content}
        </Text>
      </Link>
    </Pressable>
  );
}
