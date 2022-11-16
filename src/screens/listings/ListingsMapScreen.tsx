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
import MapView from "react-native-maps";

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
          latitude: 18.200178,
          longitude: -66.664513,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        zoomControlEnabled
      />
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
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
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
