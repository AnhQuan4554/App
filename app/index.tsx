import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home";
import Caculator from "./form";
export default function index() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Text>okok</Text>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="calculator" component={Caculator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
