import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DOMAIN } from "@env";
const Orders = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const fetchData = async (userEmail) => {
    console.log("DOMAIN", DOMAIN);

    const url = `${DOMAIN}/order/get-by-email/${userEmail}`;
    try {
      const response = await axios.post(url);
      response.data && setOrdersList(response.data);
    } catch (error) {
      console.error("Error adding Orders:", error);
      throw error;
    }
  };

  const getUserEmail = async () => {
    try {
      const value = await AsyncStorage.getItem("userEmail");
      if (value) {
        setUserEmail(value);
        console.log("user Email is", userEmail);
      }
    } catch (error) {
      console.log("no Values");
      // Error retrieving data
    }
  };
  useEffect(() => {
    getUserEmail();
  });
  useEffect(() => {
    getUserEmail();
    fetchData(userEmail);
  }, [userEmail]);
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../assets/images/back.png")}
        title={"Orders"}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.orderItem}>
        {ordersList && ordersList.length > 0 ? (
          <FlatList
            data={ordersList}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.productItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                  <View style={styles.nameView}>
                    <Text>
                      {item.title.length > 20
                        ? item.title.substring(0, 20)
                        : item.title}
                    </Text>
                    <Text>
                      {item.description.length > 30
                        ? item.description.substring(0, 30)
                        : item.description}
                    </Text>
                    <Text style={{ color: "green" }}>{"Rs." + item.price}</Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noProductText}>Không có sản phẩm nào</Text>
        )}
      </View>
    </View>
  );
};

export default Orders;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  orderItem: {
    width: "90%",
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
    borderColor: "#7D7D7DF2",
  },
  productItem: {
    width: "95%",
    flexDirection: "row",

    alignSelf: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  nameView: {
    marginLeft: 10,
  },
  noProductText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
