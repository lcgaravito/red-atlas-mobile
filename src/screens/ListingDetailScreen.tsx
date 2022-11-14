import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResultsStackParamList } from "../navigation";
import { useListingDetailQuery } from "../services/listingsApi";
import { COLORS } from "../constants";
import { Button, Card, Text } from "../components";
import { Listing } from "../types";
import { getNumberWithCommas } from "../utilities";

const ListingDetailScreen = ({
  route,
}: NativeStackScreenProps<ResultsStackParamList, "ListingDetail">) => {
  const {
    data: listing,
    isLoading,
    isFetching,
    error,
  } = useListingDetailQuery({
    id: route.params.id,
  });

  if (error) {
    console.log(error);
  }

  if (isLoading || isFetching)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );

  const pictures = () => {
    const images: Listing["photos"] = [];
    if (listing?.photos?.length) {
      let pics = listing?.photos?.sort((a, b) => a.order - b.order);
      pics.map((pic) => {
        return images.push(pic);
      });
    }
    return images;
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal={true} style={styles.imagesContainer}>
        {listing?.photos
          ?.filter((photo) => photo.order === 0 || photo.order)
          ?.sort((a, b) => a.order - b.order)
          .map((pic) => (
            <Card style={{ padding: 0 }} key={pic.id}>
              <Image style={styles.image} source={{ uri: pic.url }} />
            </Card>
          ))}
      </ScrollView>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          $ {getNumberWithCommas(listing?.price || 0)}
        </Text>
        <Text style={styles.title}>{listing?.address}</Text>
        <Text>{listing?.descriptionText}</Text>
        <Card style={{ marginHorizontal: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>SOURCE:</Text>
            {listing?.dataSource.logoUrl ? (
              <Image
                style={{ width: 100, height: 50 }}
                source={{ uri: listing?.dataSource.logoUrl }}
                resizeMode="contain"
              />
            ) : (
              <Text>{listing?.dataSource.name}</Text>
            )}
          </View>
        </Card>
        <Card style={{ marginHorizontal: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>LINK:</Text>
            {listing?.url ? (
              <Button title="View Listing" onPress={() => {}} />
            ) : null}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ListingDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
