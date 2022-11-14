import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "./BottomTabParamList";
import { COLORS } from "../constants/COLORS";
import ResultsNavigator from "./ResultsNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAppSelector } from "../redux";
import { selectUser } from "../redux/slices/userSlice";
import ProfileNavigator from "./profile/ProfileNavigator";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { token } = useAppSelector(selectUser);
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: COLORS.primary,
          marginBottom: Platform.OS === "android" ? 5 : 0,
          fontFamily: "AvenirBold",
        },
        tabBarStyle: {
          backgroundColor: COLORS.lightGrey,
        },
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={ResultsNavigator}
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
      {token ? (
        <BottomTabs.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={COLORS.primary}
              />
            ),
          }}
        />
      ) : (
        <BottomTabs.Screen
          name="Auth"
          component={AuthNavigator}
          options={{
            title: "Login",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={COLORS.primary}
              />
            ),
          }}
        />
      )}
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
