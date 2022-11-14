import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./ProfileStackParamList";
import { ProfileScreen } from "../../screens";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen name="Account" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
