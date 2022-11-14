import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { COLORS } from "./src/constants/COLORS";
import { AppNavigator } from "./src/navigation";
import { store } from "./src/redux";

export default function App() {
  const [loaded] = useFonts({
    Avenir: require("./assets/fonts/AvenirNextLTPro-Regular.otf"),
    AvenirBold: require("./assets/fonts/AvenirNextLTPro-Bold.otf"),
  });

  if (!loaded)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );

  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
