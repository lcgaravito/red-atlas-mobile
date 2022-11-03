import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../navigation";

const ListingDetailScreen = ({
  route,
}: NativeStackScreenProps<ResultsStackParamList, "ListingDetail">) => {
  return (
    <View style={styles.container}>
      <Text>ListingDetailScreen</Text>
      <Text>id: {route.params.id}</Text>
    </View>
  );
};

export default ListingDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
