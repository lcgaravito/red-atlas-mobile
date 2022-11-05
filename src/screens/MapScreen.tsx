import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import {
  selectFilters,
  toggleForLease,
  toggleForSale,
} from "../redux/slices/filtersSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../navigation";
import { useListingsResidentialQuery } from "../services/listingsApi";

const MapScreen = ({
  navigation,
}: NativeStackScreenProps<ResultsStackParamList, "Results">) => {
  const { forLease, forSale } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useListingsResidentialQuery({});
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error {error.toString()}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text>forLease: {forLease ? "true" : "false"}</Text>
      <Text>forSale: {forSale ? "true" : "false"}</Text>
      {/* {data && <Text>data: {JSON.stringify(data)}</Text>} */}
      {data?.map((listing) => (
        <TouchableOpacity
          key={listing.id}
          style={{
            justifyContent: "center",
            alignSelf: "center",
            margin: 5,
            borderWidth: 1,
            padding: 5,
          }}
          onPress={() =>
            navigation.navigate("ListingDetail", { id: listing.id })
          }
        >
          <Text key={listing.id}>{listing.address}</Text>
          <Text key={listing.id}>{listing.price}</Text>
        </TouchableOpacity>
      ))}
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
    </ScrollView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
