import { View, Text, Button } from "react-native";
import React from "react";
// import { View, Text, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";

export default function Home({ navigation }) {
  return (
    <View>
      <Text>home</Text>
      <Button
        title="okokko"
        onPress={() => navigation.navigate("calculator")}
      />
    </View>
  );
}
