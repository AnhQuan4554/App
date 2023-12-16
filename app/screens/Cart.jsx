import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import CheckoutLayout from "../common/CheckoutLayout";
import { DOMAIN } from "@env";
const Cart = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const fetchData = async () => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/order/carts/${userEmail}`;
    const response = await axios.get(url);
    response.data && setCartItems(response.data);
    // response.data && console.log("all Cart cartItems", cartItems);
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

  const getTotal = () => {
    let total = 0;
    cartItems.map((item) => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  const handleDeleteCart = async (id) => {
    const url = `${DOMAIN}/order/delete-cart/${id}`;
    try {
      await axios.delete(url);
      navigation.navigate("DeleteSuccess");
    } catch (error) {
      console.log("Lỗi khi Xóa Notify", error);
    }
  };
  const handleBuy = async (item) => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/order/creat-order`;
    const { id, ...newProductData } = item;

    newProductData["email"] = userEmail || "testOrder@gmail.com";
    newProductData["qty"] = 1;
    newProductData["description"] =
      newProductData["description"] ||
      "Khi đánh giá tổng quan về dòng máy Microsoft Surface ";
    if (userEmail) {
      console.log("user Email", userEmail);
      try {
        const response = await axios.post(url, newProductData);
        await handleDeleteCart(id);

        if (response.config.data) {
          navigation.navigate("OrderSuccess");
        }
      } catch (error) {
        console.error("Error adding Order:", error);
        throw error;
      }
    } else {
      navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={"Cart Items"}
        leftIcon={require("../../assets/images/back.png")}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      {cartItems && cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.productItem}
                onPress={() => {
                  navigation.navigate("ProductDetail", { data: item });
                }}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View>
                  <Text style={styles.name}>
                    {item.title.length > 25
                      ? item.title.substring(0, 25) + "..."
                      : item.title}
                  </Text>
                  <Text style={styles.desc}>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + "..."
                      : item.description}
                  </Text>
                  <View style={styles.qtyview}>
                    <Text style={styles.price}>{"$" + item.price}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleBuy(item)}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "green",
                        }}
                      >
                        Buy
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        handleDeleteCart(item.id);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "red",
                        }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={styles.noProductText}>Không có sản phẩm nào</Text>
      )}

      {cartItems.length < 1 && (
        <View style={styles.noItems}>
          <Text>No Items in Cart</Text>
        </View>
      )}
      {
        cartItems.length > 0 && <View></View>

        /* <CheckoutLayout items={cartItems.length} total={getTotal()} /> */
      }
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff",
  },
  productItem: {
    width: Dimensions.get("window").width,
    height: 100,
    marginTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: "green",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 5,
  },
  qtyview: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    padding: 5,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noProductText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
