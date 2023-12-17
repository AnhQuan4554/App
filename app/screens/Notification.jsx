import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Swipeout from "react-native-swipeout";
import axios from "axios";
import { DOMAIN } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notification = () => {
  const [userEmail, setUserEmail] = useState("");

  const [notifications, setNotifications] = useState([]);

  const handleNotificationPress = (notification) => {
    // Xử lý khi người dùng nhấn vào một thông báo
    // Ví dụ: Chuyển đến trang chi tiết thông báo
    // navigation.navigate('NotificationDetail', { notification });
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

  const handleDelete = (notificationId) => {
    // Xử lý xóa thông báo với ID tương ứng
    const updatedNotifications = notifications.filter(
      (item) => item.id !== notificationId
    );
    setNotifications(updatedNotifications);
  };

  const renderSwipeoutButton = () => [
    {
      text: "Delete",
      backgroundColor: "red",
      onPress: () => handleDelete(item.id),
    },
  ];
  const fetchNotify = async (userEmail) => {
    console.log("DOMAIN", DOMAIN);
    const url = `${DOMAIN}/notifycation/${userEmail}`;
    const response = await axios.get(url);
    response.data && setNotifications(response.data);
  };
  useEffect(() => {
    getUserEmail();
    fetchNotify(userEmail);
  }, [userEmail]);

  const renderItem = ({ item }) => (
    <View>
      <Swipeout right={renderSwipeoutButton()} autoClose={true}>
        <TouchableOpacity onPress={() => handleNotificationPress(item)}>
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.dateTime}>{item.created_at}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    </View>
  );

  return (
    <>
      {notifications && notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>Không có thông báo nào</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    color: "#888",
  },
});

export default Notification;
