import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const addUser = async () => {
    console.log("envs Sign up 11ss/17", process.env.domain);
    const url = `${process.env.domain}/users/creat-user`;
    const newUser = { name, password, email, phone };
    console.log("new User", newUser);
    try {
      const response = await axios.post(url, newUser);
      // console.log("Product added:", response && response.config.data);
      if (response.config.data) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error adding new User:", error);
      throw error;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Sign up"}</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={(txt) => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        style={styles.input}
        value={phone}
        onChangeText={(txt) => setPhone(txt)}
      />
      <TextInput
        placeholder="Enter password"
        style={styles.input}
        value={password}
        onChangeText={(txt) => setPassword(txt)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={styles.input}
        value={confirmPass}
        onChangeText={(txt) => setConfirmPass(txt)}
      />
      <CustomButton
        bg={"#E27800"}
        title={"Sign up"}
        color={"#fff"}
        onClick={() => {
          addUser();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        {"Login"}
      </Text>
    </View>
  );
};

export default Signup;
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
