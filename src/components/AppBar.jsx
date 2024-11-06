import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";

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
  }
});

export default function AppBar() {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text fontWeight="bold" fontSize="subheading" style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
}
