import { Pressable, View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be greater than 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be greater than 5 characters")
    .required("Password is required"),
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

function SignIn() {
  const [SignIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  async function onSubmit({ username, password }) {
    if (!username || !password) {
      return;
    }

    try {
      const { data } = await SignIn({username, password});

      if(!data) return;
      navigate("/")

    } catch(error) {
      console.log(error);
    }

  }

  return (
    <View>
      <TextInput
        style={{...styles.input, borderColor: formik.touched.username && formik.errors.username && "red" }}
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "#d73a4a", marginLeft: 12  }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={{...styles.input, borderColor: formik.touched.password && formik.errors.password && "red" }}
        placeholder="password"
        type
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "#d73a4a", marginLeft: 12 }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text backgroundColor="primary" style={styles.button} fontWeight="bold" fontSize="subheading">Sign In</Text>
      </Pressable>
    </View>
  );
}

export default SignIn;
