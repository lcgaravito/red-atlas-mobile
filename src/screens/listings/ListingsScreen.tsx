import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../redux";
import { selectFilters } from "../../redux/slices/filtersSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../../navigation";
import { useListingsResidentialQuery } from "../../services/listingsApi";
import Text from "../../components/Text";
import { Button, ListingItem } from "../../components";
import { Listing } from "../../types";
import { COLORS } from "../../constants";

const ListingsScreen = ({
  navigation,
}: NativeStackScreenProps<ResultsStackParamList, "Results">) => {
  const filters = useAppSelector(selectFilters);
  const [mapView, setMapView] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useListingsResidentialQuery({
    pagination: {
      page,
      count: 25,
      sort_by: null,
      order: null,
    },
    filters,
  });
  if (isLoading || isFetching)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.listFooterComponent}>
            <Text style={{ marginBottom: 5 }}>Page: {page}</Text>
            <Button
              title="Go to next page"
              onPress={() => setPage((prev) => prev + 1)}
            />
          </View>
        }
      />
      <Button title="Map View" onPress={() => setMapView(true)} />
      <Modal
        animationType="slide"
        visible={mapView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <Text>Title Modal</Text>
        <Button title="List View" onPress={() => setMapView(false)} />
      </Modal>
    </View>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listFooterComponent: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
