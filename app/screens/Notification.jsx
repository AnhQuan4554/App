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
const Notification = () => {
  const [notifications, setNotifications] = useState([
    // Thêm các thông báo khác theo định dạng tương tự
  ]);

  const handleNotificationPress = (notification) => {
    // Xử lý khi người dùng nhấn vào một thông báo
    console.log("Notification pressed:", notification.title);
    // Ví dụ: Chuyển đến trang chi tiết thông báo
    // navigation.navigate('NotificationDetail', { notification });
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
  const fetchNotify = async () => {
    console.log("process.env. notify11/17ss", url);
    const url = `${process.env.domain}/notifycation`;
    const response = await axios.get(url);
    response.data && setNotifications(response.data);
  };
  useEffect(() => {
    fetchNotify();
  }, []);

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
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
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
