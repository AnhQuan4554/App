import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const loginUser = async () => {
    console.log("envs Login 11/17ss22", process.env.domain);
    const url = `${process.env.domain}/users/check-user`;
    try {
      const userCheck = { email, pass };
      const response = await axios.post(url, userCheck);
      if (response.config) {
        console.log("object", response.config.data);
        saveEmailToLocalStorage(email);
        navigation.navigate("Main");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Xử lý khi nhận được response status 404 (Not Found)
        console.log("User not found!");
        alert("User not found!");
      } else {
        // Xử lý khi gặp lỗi khác
        console.error("Error:", error.message);
      }
    }
  };
  const saveEmailToLocalStorage = async (email) => {
    try {
      console.log("email được lưu", JSON.stringify(email));
      await AsyncStorage.setItem("userEmail", email);
      console.log("Email đã được lưu vào local storage.");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Lỗi khi lưu email vào local storage:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Login"}</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={pass}
        onChangeText={(txt) => setPass(txt)}
      />

      <CustomButton
        bg={"#E27800"}
        title={"Login"}
        color={"#fff"}
        onClick={() => {
          loginUser();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        {"Sign up"}
      </Text>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#000",
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  loginText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
