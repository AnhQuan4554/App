import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const User = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  ///
  const logout = async () => {
    await AsyncStorage.removeItem("userEmail");
    navigation.navigate("Login");
  };
  const getUserEmail = async () => {
    try {
      const value = await AsyncStorage.getItem("userEmail");
      if (value) {
        setUserEmail(value);
        console.log("user Email is", userEmail);
      }
    } catch (error) {
      console.log("no Value");
      // Error retrieving data
    }
  };
  useEffect(() => {
    getUserEmail();
  });
  return (
    <View style={styles.container}>
      <Header title={"Profile"} />
      <Image
        source={require("../../../assets/images/default_user.png")}
        style={styles.user}
      />
      <Text style={styles.name}>{userEmail}</Text>
      <TouchableOpacity style={[styles.tab, { marginTop: 40 }]}>
        <Text style={styles.txt}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, { marginTop: 10 }]}
        onPress={() => {
          navigation.navigate("Orders");
        }}
      >
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
        <Text style={styles.txt}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, { marginTop: 10 }]}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, { marginTop: 10 }]}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.txt}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  name: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  tab: {
    width: "90%",
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: "center",
    borderBottomColor: "#DBDBDB",
    paddingLeft: 20,
    justifyContent: "center",
  },
  txt: {
    color: "#000",
  },
});
