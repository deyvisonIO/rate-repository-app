import { Pressable, View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must have at least 5 characters")
    .max(30, "Username has a maximum of 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must have at least 5 characters")
    .max(30, "Password has a maximum of 30 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .min(5, "Password must have at least 5 characters")
    .max(30, "Password has a maximum of 30 characters")
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required("Password Confirmation is required"),
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


export function SignUpContainer({ onSubmit }) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <View>
      <TextInput
        style={{...styles.input, borderColor: formik.touched.username && formik.errors.username && "red" }}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "#d73a4a", marginLeft: 12  }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={{...styles.input, borderColor: formik.touched.password && formik.errors.password && "red" }}
        placeholder="Password"
        type
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "#d73a4a", marginLeft: 12 }}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={{...styles.input, borderColor: formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && "red" }}
        placeholder="Password confirmation"
        type
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: "#d73a4a", marginLeft: 12 }}>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text backgroundColor="primary" style={styles.button} fontWeight="bold" fontSize="subheading">Sign In</Text>
      </Pressable>
    </View>
  );
}

function SignUp() {
  const [SignUp] = useSignUp();
  const [SignIn] = useSignIn();
  const navigate = useNavigate();

  async function onSubmit({ username, password, passwordConfirmation }) {
    if (!username || !password || !passwordConfirmation || passwordConfirmation !== password) {
      return;
    }

    try {
      const { data } = await SignUp({ username, password });
      if(!data) throw new Error("Couldn't sign up");
      const { data: signedUser } = await SignIn({username, password}); 
      if(!signedUser) throw new Error("Couldn't sign in");

      navigate("/")

    } catch(error) {
      console.log(error);
    }

  }

  return <SignUpContainer onSubmit={onSubmit} />

}

export default SignUp;
