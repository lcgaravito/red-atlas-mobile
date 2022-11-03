import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { HomeScreen } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "./BottomTabParamList";
import { COLORS } from "../constants/COLORS";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: {
          color: COLORS.primary,
          marginBottom: Platform.OS === "android" ? 5 : 0,
        },
        tabBarStyle: {
          backgroundColor: COLORS.lightGrey,
        },
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={COLORS.primary}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
