import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { selectFilters } from "../redux/slices/filtersSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../navigation";
import { useListingsResidentialQuery } from "../services/listingsApi";
import { offsetPagination } from "../utilities/offsetPagination";
import Text from "../components/Text";
import { ListingItem } from "../components";
import { Listing } from "../types";

const ListingsScreen = ({
  navigation,
}: NativeStackScreenProps<ResultsStackParamList, "Results">) => {
  const { market_id, listing_sector_id } = useAppSelector(selectFilters);
  const [page, setPage] = useState(1);
  const pagination = offsetPagination({
    page,
    perPage: 25,
    sortBy: undefined,
    sortDirection: undefined,
  });
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, error } = useListingsResidentialQuery({
    pagination,
    page,
  });
  if (isLoading || isFetching) return <Text>Loading...</Text>;
  if (error) {
    console.log(error);
  }

  const handleSelectItem = (id: string) => {
    navigation.navigate("ListingDetail", { id });
  };

  const renderItem: ListRenderItem<Listing> = ({ item }) => (
    <ListingItem item={item} onSelected={handleSelectItem} />
  );

  return (
    <View style={styles.container}>
      <Text>Page: {page}</Text>
      <Button
        title="Go to ListingDetail"
        onPress={() => setPage((prev) => prev + 1)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
