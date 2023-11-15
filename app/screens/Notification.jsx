import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Swipeout from "react-native-swipeout";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, image: "https://frodos.com.vn/wp-content/uploads/2022/11/dr0-600x800.png.webp", title: "Cập nhật đơn hàng", description: "Đơn hàng Richard Mille RM57-01 Dragon and Phoenix Jackie Chan Tourbillon của bạn đã được vận chuyển. Bạn sẽ nhận được hàng trong 3-5 ngày tới.", dateTime: "2023-11-15 10:00" },
    { id: 2, image: "https://static.patek.com/images/articles/gallery/2200/7118_1451G_001_8.jpg", title: "Cập nhật đơn hàng", description: "Đơn hàng Patek Philippe NAUTILUS 7118/1451G-001 của bạn đã tới nơi. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 12:30" },
    { id: 3, image: "https://luxuryhanoi.vn/admin/timthumb.php?src=img/product/20230221145212e6c439226a0bde3e060ac5ce39b7d0f2.png&w=460", title: "Cập nhật đơn hàng", description: "Đơn hàng Rolex Deepsea Challenge 126067 RLX Titanium của bạn đã bị hủy. Phí thanh toán sẽ được hoàn lại ví trong thời gian ngắn. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 15:45" },
    { id: 4, image: "https://frodos.com.vn/wp-content/uploads/2022/11/dr0-600x800.png.webp", title: "Cập nhật đơn hàng", description: "Đơn hàng Richard Mille RM57-01 Dragon and Phoenix Jackie Chan Tourbillon của bạn đã được vận chuyển. Bạn sẽ nhận được hàng trong 3-5 ngày tới.", dateTime: "2023-11-15 10:00" },
    { id: 5, image: "https://static.patek.com/images/articles/gallery/2200/7118_1451G_001_8.jpg", title: "Cập nhật đơn hàng", description: "Đơn hàng Patek Philippe NAUTILUS 7118/1451G-001 của bạn đã tới nơi. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 12:30" },
    { id: 6, image: "https://luxuryhanoi.vn/admin/timthumb.php?src=img/product/20230221145212e6c439226a0bde3e060ac5ce39b7d0f2.png&w=460", title: "Cập nhật đơn hàng", description: "Đơn hàng Rolex Deepsea Challenge 126067 RLX Titanium của bạn đã bị hủy. Phí thanh toán sẽ được hoàn lại ví trong thời gian ngắn. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 15:45" },
    { id: 7, image: "https://frodos.com.vn/wp-content/uploads/2022/11/dr0-600x800.png.webp", title: "Cập nhật đơn hàng", description: "Đơn hàng Richard Mille RM57-01 Dragon and Phoenix Jackie Chan Tourbillon của bạn đã được vận chuyển. Bạn sẽ nhận được hàng trong 3-5 ngày tới.", dateTime: "2023-11-15 10:00" },
    { id: 8, image: "https://static.patek.com/images/articles/gallery/2200/7118_1451G_001_8.jpg", title: "Cập nhật đơn hàng", description: "Đơn hàng Patek Philippe NAUTILUS 7118/1451G-001 của bạn đã tới nơi. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 12:30" },
    { id: 9, image: "https://luxuryhanoi.vn/admin/timthumb.php?src=img/product/20230221145212e6c439226a0bde3e060ac5ce39b7d0f2.png&w=460", title: "Cập nhật đơn hàng", description: "Đơn hàng Rolex Deepsea Challenge 126067 RLX Titanium của bạn đã bị hủy. Phí thanh toán sẽ được hoàn lại ví trong thời gian ngắn. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 15:45" },
    { id: 10, image: "https://frodos.com.vn/wp-content/uploads/2022/11/dr0-600x800.png.webp", title: "Cập nhật đơn hàng", description: "Đơn hàng Richard Mille RM57-01 Dragon and Phoenix Jackie Chan Tourbillon của bạn đã được vận chuyển. Bạn sẽ nhận được hàng trong 3-5 ngày tới.", dateTime: "2023-11-15 10:00" },
    { id: 11, image: "https://static.patek.com/images/articles/gallery/2200/7118_1451G_001_8.jpg", title: "Cập nhật đơn hàng", description: "Đơn hàng Patek Philippe NAUTILUS 7118/1451G-001 của bạn đã tới nơi. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 12:30" },
    { id: 12, image: "https://luxuryhanoi.vn/admin/timthumb.php?src=img/product/20230221145212e6c439226a0bde3e060ac5ce39b7d0f2.png&w=460", title: "Cập nhật đơn hàng", description: "Đơn hàng Rolex Deepsea Challenge 126067 RLX Titanium của bạn đã bị hủy. Phí thanh toán sẽ được hoàn lại ví trong thời gian ngắn. Vui lòng kiểm tra và xác nhận.", dateTime: "2023-11-15 15:45" },
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
    const updatedNotifications = notifications.filter((item) => item.id !== notificationId);
    setNotifications(updatedNotifications);
  };


  const renderSwipeoutButton = () => [
    {
      text: "Delete",
      backgroundColor: "red",
      onPress: () => handleDelete(item.id),
    },
  ];

  const renderItem = ({ item }) => (
    <View>
      <Swipeout right={renderSwipeoutButton()} autoClose={true}>
        <TouchableOpacity onPress={() => handleNotificationPress(item)}>
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.dateTime}>{item.dateTime}</Text>
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
