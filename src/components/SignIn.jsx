import { Pressable, View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";

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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  function onSubmit(values) {
    const username = values.username;
    const password = values.password;
    if (!username || !password) {
      return;
    }

    console.log("username:", username);
    console.log("password:", password);
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
