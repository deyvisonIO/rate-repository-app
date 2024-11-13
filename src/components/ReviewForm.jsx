import { Pressable, View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const initialValues = {
  username: "",
  password: "",
  rating: "0",
  review: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "The minimum rating is 0")
    .max(100, "The Maximum rating is 100")
    .required("ratign is required"),
  review: yup.string().optional(),
});

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    color: "white",
    paddingVertical: 10,
    textAlign: "center",
    margin: 12,
  },
});

export function ReviewFormContainer({ onSubmit }) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style={{
          ...styles.input,
          borderColor:
            formik.touched.ownerName && formik.errors.ownerName && "red",
        }}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: "#d73a4a", marginLeft: 12 }}>
          {formik.errors.ownerName}
        </Text>
      )}

      <TextInput
        style={{
          ...styles.input,
          borderColor:
            formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            "red",
        }}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: "#d73a4a", marginLeft: 12 }}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <TextInput
        style={{
          ...styles.input,
          borderColor: formik.touched.rating && formik.errors.rating && "red",
        }}
        placeholder="rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: "#d73a4a", marginLeft: 12 }}>
          {formik.errors.rating}
        </Text>
      )}

      <TextInput
        style={{
          ...styles.input,
          borderColor: formik.touched.review && formik.errors.review && "red",
        }}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: "#d73a4a", marginLeft: 12 }}>
          {formik.errors.review}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          backgroundColor="primary"
          style={styles.button}
          fontWeight="bold"
          fontSize="subheading"
        >
          Create a Review
        </Text>
      </Pressable>
    </View>
  );
}

function ReviewForm() {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  async function onSubmit({ ownerName, repositoryName, rating, review }) {
    if (!ownerName || !repositoryName || !rating) {
      return;
    }

    console.log("OwnerName", ownerName);
    console.log("RepositoryName", repositoryName);
    console.log("Rating", rating);
    console.log("Review", review);

    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text: review,
      });

      if (!data) return;
      console.log(data);
      navigate("/" + data.createReview.repository.id);
    } catch (error) {
      console.log(error);
    }
  }

  return <ReviewFormContainer onSubmit={onSubmit} />;
}

export default ReviewForm;
