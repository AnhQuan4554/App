import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Home from "../Home";
import Search from "../../../components/Search";
import Wishlist from "../Wishlist";
import Notification from "../Notification";
import User from "../User";
import axios from "axios";
import { DOMAIN } from "@env";
const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [arrProduct, setarrProduct] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const fetchUser = async () => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/product`;
    const response = await axios.get(url);
    response.data && setarrProduct(response.data);
    response.data && console.log("arrData1", arrProduct);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Home arrProduct={arrProduct} />
      ) : selectedTab == 1 ? (
        <Search arrProduct={arrProduct} />
      ) : selectedTab == 2 ? (
        <Wishlist />
      ) : selectedTab == 3 ? (
        <Notification />
      ) : (
        <User />
      )}
      {!isKeyboardVisible && (
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(0);
            }}
          >
            <Image
              source={
                selectedTab == 0
                  ? require("../../../assets/images/home_fill.png")
                  : require("../../../assets/images/home.png")
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(1);
            }}
          >
            <Image
              source={require("../../../assets/images/search.png")}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(2);
            }}
          >
            <Image
              source={
                selectedTab == 2
                  ? require("../../../assets/images/wishlist_fill.png")
                  : require("../../../assets/images/wishlist.png")
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(3);
            }}
          >
            <Image
              source={
                selectedTab == 3
                  ? require("../../../assets/images/noti_fill.png")
                  : require("../../../assets/images/noti.png")
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(4);
            }}
          >
            <Image
              source={
                selectedTab == 4
                  ? require("../../../assets/images/user_fill.png")
                  : require("../../../assets/images/user.png")
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bottomTab: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
