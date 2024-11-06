import { StyleSheet, View, Image } from "react-native";
import Text from "./Text";
const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 5,
  },
  repositoryHeading: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  repositoryTitle: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
    gap: 2,
  },
  language: {
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    display: "flex",
    marginRight: "auto",
    marginTop: 4,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    gap: 10,
  },
  stat: {
    textAlign: "center"
  }
})



export function RepositoryItem(props) {
  return (
    <View key={props.item.id} style={styles.view}>
      <View style={styles.repositoryHeading}>
        <Image source={{ uri: props.item.ownerAvatarUrl }} style={styles.avatar} /> 
        <View style={styles.repositoryTitle}>
          <Text color="primary" fontWeight="bold" fontSize="subheading" >{props.item.fullName}</Text>
          <Text  color="textSecondary">{props.item.description}</Text>
          <Text style={styles.language} backgroundColor="primary">{props.item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View>
          <Text color="textSecondary" fontWeight="bold" style={styles.stat}>{parseThousand(props.item.stargazersCount)}</Text>
          <Text color="textSecondary" >Starts</Text>
        </View>
        <View>
          <Text color="textSecondary" fontWeight="bold" style={styles.stat}>{parseThousand(props.item.forksCount)}</Text>
          <Text color="textSecondary" >Forks</Text>
        </View>
        <View>
          <Text color="textSecondary" fontWeight="bold" style={styles.stat}>{parseThousand(props.item.reviewCount)}</Text>
          <Text color="textSecondary" >Reviews</Text>
        </View>
        <View>
          <Text color="textSecondary" fontWeight="bold" style={styles.stat}>{parseThousand(props.item.ratingAverage)}</Text>
          <Text color="textSecondary" >Rating</Text>
        </View>
      </View>
    </View>
  );
}

function parseThousand(number) {
  if(number > 1000) {
    let newNumber = number / 1000;

    newNumber = newNumber.toFixed(2) + "k";
    return newNumber;
  }

  return number.toString();
}
