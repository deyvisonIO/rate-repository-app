import { StyleSheet, View, Image, Pressable, FlatList } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { openURL } from "expo-linking";
import { ItemSeparator } from "./RepositoryList";
import theme from "../theme";


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
    textAlign: "center",
  },
  button: {
    color: "white",
    paddingVertical: 10,
    textAlign: "center",
    margin: 12,
  },
  reviewItem: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    justifyContent: "space-around",
    flexShrink: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rating: {
    height: 40,
    width: 40,
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 100,
    borderColor:  theme.colors.primary,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  }
});

export function RepositoryItemPage() {
  const id = useParams().id;
  const { data, loading } = useRepository(id);

  if (loading) return null;

  return (
    <FlatList
      data={data.repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} singleView />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

function ReviewItem({ review }) {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.rating}>
        <Text>{review.rating}</Text>
      </View>
      <View>
        <Text color="primary" fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text>{new Date(review.createdAt).toDateString()}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}


export function RepositoryItem(props) {
  return (
    <View
      testID="repositoryItem"
      key={props.item.id}
      style={styles.view}
    >
      <View style={styles.repositoryHeading}>
        <Image
          source={{ uri: props.item.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.repositoryTitle}>
          <Text color="primary" fontWeight="bold" fontSize="subheading">
            {props.item.fullName}
          </Text>
          <Text color="textSecondary">{props.item.description}</Text>
          <Text style={styles.language} backgroundColor="primary">
            {props.item.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View>
          <Text
            color="textSecondary"
            fontWeight="bold"
            style={styles.stat}
            testID="stars"
          >
            {parseThousand(props.item.stargazersCount)}
          </Text>
          <Text color="textSecondary">Starts</Text>
        </View>
        <View>
          <Text
            color="textSecondary"
            fontWeight="bold"
            style={styles.stat}
            testID="forks"
          >
            {parseThousand(props.item.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View>
          <Text
            color="textSecondary"
            fontWeight="bold"
            style={styles.stat}
            testID="reviews"
          >
            {parseThousand(props.item.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View>
          <Text
            color="textSecondary"
            fontWeight="bold"
            style={styles.stat}
            testID="rating"
          >
            {parseThousand(props.item.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {props.singleView && (
        <Pressable onPress={() => openURL(props.item.url)}>
          <Text
            backgroundColor="primary"
            style={styles.button}
            fontWeight="bold"
            fontSize="subheading"
          >
            Open in GitHub 
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export function parseThousand(number) {
  if (number > 1000) {
    let newNumber = number / 1000;

    newNumber = newNumber.toFixed(2) + "k";
    return newNumber;
  }

  return number.toString();
}
