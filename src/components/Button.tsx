import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import Text from "./Text";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
const Button = ({ title, onPress, disabled }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress} disabled={disabled}>
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
    shadowColor: COLORS.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 6,
  },
  text: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
