import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import Text from "./Text";

type ButtonProps = {
  title: string;
  onPress: () => void;
};
const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 50,
  },
  text: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
