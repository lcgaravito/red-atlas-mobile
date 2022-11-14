import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Listing } from "../../types";
import Card from "../Card";
import { COLORS } from "../../constants";
import Text from "../Text";
import NotImage from "../../../assets/img/notImg.jpg";
import { getNumberWithCommas, sqmToSqft } from "../../utilities";

type ListingItemProps = {
  item: Listing;
  onSelected: (listingID: string) => void;
};

const ListingItem = ({ item, onSelected }: ListingItemProps) => {
  return (
    <TouchableOpacity onPress={() => onSelected(item.id)}>
      <Card style={styles.card}>
        <Image
          style={styles.image}
          source={
            item.listing_picture_url
              ? { uri: item.listing_picture_url }
              : NotImage
          }
        />
        <View style={styles.description}>
          <Text style={styles.title}>$ {getNumberWithCommas(item.price)}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {item.rooms && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Ionicons
                  style={{ marginRight: 5 }}
                  name="bed-outline"
                  size={20}
                />
                <Text style={styles.paragraph}>{item.rooms}</Text>
              </View>
            )}
            {item.toilets && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="restroom"
                  size={20}
                />
                <Text style={styles.paragraph}>{item.toilets}</Text>
              </View>
            )}
            {item.builtArea && (
              <>
                <Ionicons
                  style={{ marginRight: 5 }}
                  name="resize-outline"
                  size={20}
                />
                <Text style={styles.paragraph}>
                  {Number.parseInt(`${sqmToSqft(item.builtArea)}`)} sqft
                </Text>
              </>
            )}
          </View>
          {item.address && <Text style={styles.paragraph}>{item.address}</Text>}
          {item.title && <Text style={styles.paragraph}>{item.title}</Text>}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ListingItem;

const styles = StyleSheet.create({
  card: {
    padding: 0,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  description: {
    padding: 15,
  },
  title: {
    fontFamily: "AvenirBold",
    fontSize: 20,
    color: COLORS.black,
  },
  paragraph: {
    fontFamily: "Avenir",
    color: COLORS.black,
    paddingVertical: 5,
  },
});
