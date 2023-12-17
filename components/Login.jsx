import { View, Text, StyleSheet, TextInput, Image,TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DOMAIN } from "@env";
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const loginUser = async () => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/users/check-user`;
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
    <TouchableOpacity>
      <Image
      source={require('../assets/images/Logolaptop.png')} // Đường dẫn đến ảnh trong dự án
      style={styles.headerImage}
      />
      </TouchableOpacity>
      <Text style={styles.title}>{"LOGIN FORM"}</Text>
      <Text style={styles.title1}>{"UserName"}</Text>
      <TextInput
        placeholder="Email or Username"
        style={styles.input}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <Text style={styles.title1}>{"Password"}</Text>
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={pass}
        onChangeText={(txt) => setPass(txt)}
      />

      <CustomButton
        bg={"#4a8cf7"}
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
  headerImage: {
    width: 200, // Đặt chiều rộng của ảnh
    height: 200, // Đặt chiều cao của ảnh
    marginLeft:100,
    resizeMode: 'cover', // Có thể sử dụng 'contain', 'stretch', 'center', tùy thuộc vào yêu cầu của bạn
  },
  title: {
    color: "#000",
    fontSize: 50,
    marginLeft: 55,
    marginTop: 20,
    marginBottom: 30,
    fontWeight: "600",
  },
  title1: {
    color: "#000",
    fontSize: 20,
    marginLeft: 25,
    marginTop: 30,
    fontWeight: "600",
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
    textDecorationLine: "none",
    backgroundColor: "#4a8cf7",
    width:370,
    height:50,
    textAlign: "center",
    textAlignVertical: 'center',
    color:"#fff",
    borderRadius: 10,
  },
});
