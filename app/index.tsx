import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function form() {
  const [courses, setCourses] = useState<any>([]); // State để lưu thông tin môn học

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    credit: "",
    year: "",
    instructor: "",
    score: "",
  }); // State để lưu thông tin từng môn học
  const handleChange = (key: any, value: any) => {
    setCourseInfo({ ...courseInfo, [key]: value });
  };

  const handleSubmit = () => {
    setCourses([...courses, courseInfo]);
    setCourseInfo({
      name: "",
      credit: "",
      year: "",
      instructor: "",
      score: "",
    });
  };
  const calculateGPA = () => {
    // Tính tổng điểm và tổng số tín chỉ từ danh sách các môn học
    let totalGrade = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const grade = parseFloat(course.score);
      const credits = parseFloat(course.credit);

      if (!isNaN(grade) && !isNaN(credits)) {
        totalGrade += grade * credits;
        totalCredits += credits;
      }
    }

    if (totalCredits > 0) {
      const gpa = totalGrade / totalCredits;
      alert(`Điểm trung bình toàn khóa: ${gpa.toFixed(2)}`);
    } else {
      alert("Không có môn học hợp lệ để tính điểm trung bình.");
    }
    if (totalCredits > 0) {
      const gpa = totalGrade / totalCredits;
      alert(`Điểm trung bình toàn khóa: ${gpa.toFixed(2)}`);

      if (gpa >= 5 && gpa < 7) {
        alert("Kỹ sư trung bình");
      } else if (gpa >= 7 && gpa < 9) {
        alert("Kỹ sư khá");
      } else if (gpa >= 9 && gpa <= 10) {
        alert("Giỏi");
      }
    } else {
      alert("Không có môn học hợp lệ để tính điểm trung bình.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hệ thống tính điểm PTIT</Text>
      <Text style={styles.header}>Thông tin môn học</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên môn học"
        value={courseInfo.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tín chỉ"
        value={courseInfo.credit}
        onChangeText={(text) => handleChange("credit", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Năm học"
        value={courseInfo.year}
        onChangeText={(text) => handleChange("year", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Giảng viên"
        value={courseInfo.instructor}
        onChangeText={(text) => handleChange("instructor", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Điểm số"
        value={courseInfo.score}
        onChangeText={(text) => handleChange("score", text)}
      />
      <Button title="Thêm" onPress={handleSubmit} />
      <View style={{ marginTop: 10 }}>
        <Button title="Tính Điểm Trung Bình" onPress={calculateGPA} />
      </View>

      <Text style={styles.header}>Danh sách các môn học:</Text>

      {courses.map((course: any, index: any) => (
        <View key={index}>
          <Text>Tên môn học: {course.name}</Text>
          <Text>Số tín chỉ: {course.credit}</Text>
          <Text>Năm học: {course.year}</Text>
          <Text>Giảng viên: {course.instructor}</Text>
          <Text>Điểm số: {course.score}</Text>
          <Text>-----------------------------</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
