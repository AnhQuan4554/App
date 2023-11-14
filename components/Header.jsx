import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// const { height, width } = Dimensions.get("window");
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart,
}) => {
  const navigation = useNavigation();

  //   const cartItems = useSelector((state) => state.cart);
  //   console.log(cartItems);
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}
      >
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {!isCart && <View></View>}
      {isCart && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Image
            source={rightIcon}
            style={[styles.icon, { width: 40, height: 40 }]}
          />
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#fff",
              position: "absolute",
              right: 0,
              top: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Text style={{ color: "#000" }}>{cartItems.data.length}</Text> */}
            <Text style={{ color: "#000" }}>12</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    width: 10,
    height: 65,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "red",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
});
