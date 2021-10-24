import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticatorScreen from "../components/screens/AuthenticatorScreen";
import UserListScreen from "../components/screens/UserListScreen";
import { useSelector } from "react-redux";
import pageName from "../constants/pageName";

const Stack = createNativeStackNavigator();

const NavigationsContainer = () => {
  const selector = useSelector(state => state);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={selector?.Reducer?.initialPage}>
        <Stack.Screen
          name={pageName.authenticator}
          component={AuthenticatorScreen}
          options={{
            headerShown: false,
            title: null,
          }}
        />
        <Stack.Screen
          name={pageName.userList}
          component={UserListScreen}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationsContainer;
