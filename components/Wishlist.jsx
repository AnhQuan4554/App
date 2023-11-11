import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Header from "./Header";

const Wishlist = () => {
  // const [wishlistItems, setWishlistItems] = useState(items.data);
  const [wishlistItems, setWishlistItems] = useState([
    {
      image:
        "https://anhdepfree.com/wp-content/uploads/2018/12/hinh-nen-phong-canh-thien-nhien-67.jpg",
      title: "tesst title",
      description: "tesst description",
      price: 45,
    },
    {
      image:
        "https://hongbiencang.com/home/wp-content/uploads/2022/09/anh-dep-gai-xinh_025059121.png",
      title: "tesst title",
      description: "tesst description",
      price: 45,
    },
    {
      image:
        "https://hongbiencang.com/home/wp-content/uploads/2022/09/anh-dep-gai-xinh_025059121.png",
      title: "tesst title",
      description: "tesst description",
      price: 45,
    },
    {
      image:
        "https://hongbiencang.com/home/wp-content/uploads/2022/09/anh-dep-gai-xinh_025059121.png",
      title: "tesst title",
      description: "tesst description",
      price: 45,
    },
  ]);

  return (
    <View style={styles.container}>
      <Header title={"Wishlist Items"} />
      <FlatList
        data={wishlistItems}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              style={styles.productItem}
              // onPress={() => {
              //   navigation.navigate('ProductDetail', {data: item});
              // }}
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
                <Text style={styles.price}>{"$" + item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;
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
});
