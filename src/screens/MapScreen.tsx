import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import {
  selectFilters,
  toggleForLease,
  toggleForSale,
} from "../redux/slices/filtersSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../navigation";

const MapScreen = ({
  navigation,
}: NativeStackScreenProps<ResultsStackParamList, "Results">) => {
  const { forLease, forSale } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text>forLease: {forLease ? "true" : "false"}</Text>
      <Text>forSale: {forSale ? "true" : "false"}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Toggle forLease"
          onPress={() => dispatch(toggleForLease())}
        />
        <Button
          title="Toggle forSale"
          onPress={() => dispatch(toggleForSale())}
        />
      </View>
      <Button
        title="Go to ListingDetail"
        onPress={() =>
          navigation.navigate("ListingDetail", {
            id: "123",
          })
        }
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
