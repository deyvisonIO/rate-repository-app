import { Alert, FlatList } from "react-native";
import useMe from "../hooks/useMe";
import { ItemSeparator } from "./RepositoryList";
import { ReviewItem } from "./RepositoryItem";
import useReviewDelete from "../hooks/useReviewDelete";

export function MyReviews() {
  const { data, loading, refetch } = useMe(true);
  const [deleteReview] = useReviewDelete()


  function confirmDeletion(reviewId) {
    Alert.alert("Delete review","Are you sure you want to delete this review ?", [
      {
        text: "CANCEL",
        style: "cancel"
      },
      {
        text: "DELETE",
        onPress: async () => {
          await deleteReview(reviewId)
          await refetch()
        },
        style: "default"
      }
    ])
  } 

  if (loading) return null;

  return (
    <FlatList
      data={data.me.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} confirmDeletion={confirmDeletion} actions />}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

