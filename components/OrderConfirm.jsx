import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DOMAIN } from "@env";

const OrderConfirm = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const [userEmail, setUserEmail] = useState("");
  const [address, setAddress] = useState();
  const [orderDetails, setOrderDetails] = useState(route.params.orderDetails);
  // Giả sử orderDetails chứa thông tin sản phẩm và thông tin địa chỉ

  // Tính tổng tiền từ các thông tin sản phẩm
  const getTotalPrice = () => {
    let totalPrice = 0;
    orderDetails.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    return totalPrice;
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
  getUserEmail();
  const fetchAddress = async (userEmail) => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/users/${userEmail}`;
    const response = await axios.get(url);
    response.data && setAddress(response.data);
  };
  useEffect(() => {
    getUserEmail();
    fetchAddress(userEmail);
  }, [userEmail]);
  const handleBuy = async () => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/order/creat-order`;
    const response = await axios.post(url, route.params.orderDetails[0]);
    console.log("Order added:", response && response.config.data);
    if (response.config.data) {
      navigation.navigate("OrderSuccess");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Confirm Order</Text>
      <FlatList
        data={orderDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.title}</Text>
            <Text>Quantity: {item.qty}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Total: ${item.price * item.qty}</Text>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>
        Total Price: ${getTotalPrice().toFixed(2)}
      </Text>
      {/* Hiển thị thông tin địa chỉ */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Delivery Address: {address}</Text>
        {/* Đặt thông tin địa chỉ ở đây */}
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleBuy}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center", // Canh giữa theo chiều dọc
    alignItems: "center", // Canh giữa theo chiều ngang
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", // Căn giữa văn bản
  },
  image: {
    width: 200, // Kích thước ảnh sản phẩm
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center", // Căn giữa văn bản
  },
  addressContainer: {
    marginTop: 20,
    width: "80%", // Chiều rộng container thông tin địa chỉ
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center", // Căn giữa văn bản
  },
  confirmButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "50%", // Chiều rộng nút Confirm
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderConfirm;
