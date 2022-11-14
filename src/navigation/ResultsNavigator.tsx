import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { ListingDetailScreen, ListingsScreen } from "../screens";
import { ResultsStackParamList } from "./ResultsStackParamList";
import Logotype from "../../assets/img/logotype.png";

const Stack = createNativeStackNavigator<ResultsStackParamList>();

const ResultsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Results"
      screenOptions={{
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontFamily: "Avenir",
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="Results"
        component={ListingsScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Results")}>
              <Image style={{ width: 211, height: 47 }} source={Logotype} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="ListingDetail" component={ListingDetailScreen} />
    </Stack.Navigator>
  );
};

export default ResultsNavigator;
