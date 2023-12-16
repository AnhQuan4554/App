import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DOMAIN } from "@env";
const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [qty, setQty] = useState(1);
  const [userEmail, setUserEmail] = useState("");
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
  const handleBuyPress = async () => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/order/creat-order`;
    const { id, ...newProductData } = route.params.data;

    newProductData["email"] = userEmail || "testOrder@gmail.com";
    newProductData["qty"] = qty;
    newProductData["description"] =
      newProductData["description"] ||
      "Khi đánh giá tổng quan về dòng máy Microsoft Surface ";
    if (userEmail) {
      console.log("user Email", userEmail);
      try {
        const response = await axios.post(url, newProductData);
        console.log("Order added:", response && response.config.data);
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
  const handleAddToCartPress = async () => {
    console.log("envs11/17", DOMAIN);
    const url = `${DOMAIN}/order/creat-cart`;
    const { id, ...newProductData } = route.params.data;

    newProductData["email"] = userEmail || "test22@gmail.com";
    newProductData["qty"] = qty;
    newProductData["description"] =
      newProductData["description"] ||
      "Khi đánh giá tổng quan về dòng máy Microsoft Surface ";
    if (userEmail) {
      try {
        const response = await axios.post(url, newProductData);
        // console.log("Product added:", response && response.config.data);
        if (response.config.data) {
          navigation.navigate("OrderSuccess");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        throw error;
      }
    } else {
      navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../assets/images/back.png")}
        rightIcon={require("../../assets/images/cart.png")}
        title={"Product Detail"}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: route.params.data.image }}
          style={styles.banner}
        />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.price, { color: "#000" }]}>{"Price:"}</Text>
          <Text style={styles.price}>{" $" + route.params.data.price}</Text>
          <View style={styles.qtyView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setQty(qty + 1);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.wishlistBtn} onPress={() => {}}>
          <Image
            source={require("../../assets/images/wishlist.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
            <Text style={styles.buttonText}>Mua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCartPress}
          >
            <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  banner: {
    width: "100%",
    height: 300,
    resizeMode: "center",
  },
  title: {
    fontSize: 23,
    color: "#000",
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
  },
  desc: {
    fontSize: 16,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  price: {
    color: "green",
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
  },
  wishlistBtn: {
    position: "absolute",
    right: 20,
    top: 100,
    backgroundColor: "#E2DFDF",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  qtyView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  btn: {
    padding: 5,
    width: 30,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Canh các nút đều nhau theo chiều ngang
    marginTop: 20,
  },
  buyButton: {
    backgroundColor: "#3498db",
    width: "40%",
    borderRadius: 8,
    paddingVertical: 10,
  },
  addToCartButton: {
    backgroundColor: "#2ecc71",
    width: "40%",
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
