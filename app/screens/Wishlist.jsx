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
import { DOMAIN } from "@env";
import axios from "axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const fetchData = async () => {
    console.log("DOMAIN", DOMAIN);

    const url = `${DOMAIN}/order/best-seller`;
    try {
      const response = await axios.get(url);
      response.data && setWishlistItems(response.data);
    } catch (error) {
      console.error("Error adding Orders:", error);
      throw error;
    }
  };
  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productQuantitySold}>
            Sold Quantity: {item.totalQuantity}
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    fetchData();
    console.log(wishlistItems);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Seller Products</Text>
      <FlatList
        data={wishlistItems}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Wishlist;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 1, // Thêm viền dưới cho mỗi sản phẩm
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  productQuantitySold: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});
