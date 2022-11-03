import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListingDetailScreen, MapScreen } from "../screens";
import { ResultsStackParamList } from "./ResultsStackParamList";

const Stack = createNativeStackNavigator<ResultsStackParamList>();

const ResultsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Results">
      <Stack.Screen name="Results" component={MapScreen} />
      <Stack.Screen name="ListingDetail" component={ListingDetailScreen} />
    </Stack.Navigator>
  );
};

export default ResultsNavigator;
