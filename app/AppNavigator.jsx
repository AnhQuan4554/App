import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Main";
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";
import Login from "../components/Login";
import Signup from "../components/Signup";
import OrderSuccess from "../components/OrderSuccess";
import DeleteSuccess from "../components/DeleteSuccess";
import Orders from "./screens/Orders";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeleteSuccess"
          component={DeleteSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
