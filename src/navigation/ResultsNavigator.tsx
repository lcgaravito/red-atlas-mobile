import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import {
  ListingDetailScreen,
  ListingsMapScreen,
  ListingsResultScreen,
} from "../screens";
import { ResultsStackParamList } from "./ResultsStackParamList";
import Logotype from "../../assets/img/logotype.png";

const Stack = createNativeStackNavigator<ResultsStackParamList>();

const ResultsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MapResults"
      screenOptions={{
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontFamily: "Avenir",
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="MapResults"
          component={ListingsMapScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Results")}>
                <Image style={{ width: 211, height: 47 }} source={Logotype} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ListingDetail"
          component={ListingDetailScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Results")}>
                <Image style={{ width: 184, height: 41 }} source={Logotype} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="ListResults"
          component={ListingsResultScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Results")}>
                <Image style={{ width: 184, height: 41 }} source={Logotype} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ResultsNavigator;
