import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { selectFilters } from "../redux/slices/filtersSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../navigation";
import { useListingsResidentialQuery } from "../services/listingsApi";
import { offsetPagination } from "../utilities/offsetPagination";

const MapScreen = ({
  navigation,
}: NativeStackScreenProps<ResultsStackParamList, "Results">) => {
  const { market_id, listing_sector_id } = useAppSelector(selectFilters);
  const pagination = offsetPagination({
    page: 1,
    perPage: 25,
    sortBy: undefined,
    sortDirection: undefined,
  });
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, error, originalArgs } =
    useListingsResidentialQuery({
      pagination,
      page,
    });
  if (isLoading || isFetching) return <Text>Loading...</Text>;
  if (error) {
    console.log(error.data.errors);
    console.log(originalArgs);
    return <Text>Error {error.toString()}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Page: {page}</Text>
      <Button
        title="Go to ListingDetail"
        onPress={() => setPage((prev) => prev + 1)}
      />
      {data?.map((listing, index) => (
        <TouchableOpacity
          key={index}
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
          <Text>{listing.address}</Text>
          <Text>{listing.price}</Text>
          <Text>{listing.builtArea}</Text>
        </TouchableOpacity>
      ))}
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
