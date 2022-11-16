import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../redux";
import { selectFilters } from "../../redux/slices/filtersSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../../navigation";
import { useListingsResidentialQuery } from "../../services/listingsApi";
import Text from "../../components/Text";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import MapView, { Marker } from "react-native-maps";

const ListingsMapScreen = ({
  navigation,
}: NativeStackScreenProps<ResultsStackParamList, "MapResults">) => {
  const filters = useAppSelector(selectFilters);
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 18.100178,
          longitude: -66.167603,
          latitudeDelta: 0.512,
          longitudeDelta: 0.515,
        }}
        zoomControlEnabled={true}
        mapType="standard"
      >
        {[
          {
            id: "7de10048-70bc-493f-93fd-b6f1f1aad1bc",
            coordinate: { latitude: 18.350345, longitude: -66.267603 },
          },
          {
            id: "616efe00-dafe-4ce3-be4a-2248a04bb2c7",
            coordinate: { latitude: 18.222017, longitude: -66.767605 },
          },
          {
            id: "68eee340-6074-4278-9661-f77665fd60fc",
            coordinate: { latitude: 18.390212, longitude: -66.367607 },
          },
          {
            id: "e3ddf2da-307f-4fae-a40f-af94d5d0242d",
            coordinate: { latitude: 18.060564, longitude: -66.967609 },
          },
          {
            id: "e9544b09-efde-421d-810f-68553766e41e",
            coordinate: { latitude: 18.230876, longitude: -66.567611 },
          },
        ].map(({ id, coordinate }) => (
          <Marker
            key={id}
            title="Ubicación de prueba"
            coordinate={coordinate}
            onPress={() => navigation.navigate("ListingDetail", { id })}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => navigation.navigate("ListResults")}
      >
        <Ionicons style={{ marginRight: 5 }} name="list" size={20} />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>List View</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListingsMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  listFooterComponent: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 6,
    backgroundColor: COLORS.white,
  },
});
