import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
const Home = ({ arrProduct }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState();
  useEffect(() => {
    arrProduct && setProducts(arrProduct);
  }, [arrProduct]);
  return (
    <View style={styles.container}>
      {/* <Header
        leftIcon={require("../../assets/images/menu.png")}
        rightIcon={require("../../assets/images/cart.png")}
        title={"Grocery App"}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
        isCart={true}
      /> */}
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
    flex: 1,
    width: Dimensions.get("window").width,
    height: 100,
    marginTop: 10,
    paddingLeft:10,
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
    marginLeft: 30,
  },
  desc: {
    marginLeft: 30,
  },
  price: {
    color: "green",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginTop: 5,
  },
  flatList: {
    height: 1000, // Đặt chiều cao của FlatList ở đây, có thể sử dụng '80%' hoặc giá trị khác tùy thuộc vào yêu cầu của bạn
  },
});
