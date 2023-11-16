import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
const Home = ({ arrProduct }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([
    {
      image:
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      title: "Day la cai lol qu gi",
      description: "Test descriptiondescriptiondes",
      price: 1000,
    },
    {
      image:
        "https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/13034625/image-danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi-164709278437272.jpg",
      title: "Day la cai lol qu gi",
      description: "Test descriptiondescriptiondes",
      price: 1000,
    },
    {
      image:
        "https://hongbiencang.com/home/wp-content/uploads/2022/09/anh-dep-gai-xinh_025059121.png",
      title: "Day la cai lol qu gi",
      description: "Test descriptiondescriptiondes",
      price: 1000,
    },
    {
      image:
        "https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/13034625/image-danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi-164709278437272.jpg",
      title: "Day la cai lol qu gi",
      description: "Test descriptiondescriptiondes",
      price: 1000,
    },
    {
      image:
        "https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/13034625/image-danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi-164709278437272.jpg",
      title: "Day la cai lol qu gi",
      description: "Test descriptiondescriptiondes",
      price: 1000,
    },
  ]);
  useEffect(() => {
    arrProduct && setProducts(arrProduct);
  }, [arrProduct]);
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../assets/images/menu.png")}
        rightIcon={require("../../assets/images/cart.png")}
        title={"Grocery App"}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        isCart={true}
      />
      <FlatList
        data={products}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              key={index}
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
                <Text style={styles.price}>{"$" + item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
