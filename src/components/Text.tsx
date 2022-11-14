import { StyleSheet, Text as RNText, TextProps, View } from "react-native";
import React from "react";

const Text = ({ children, ...rest }: TextProps) => {
  return (
    <RNText style={styles.root} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  root: {
    fontFamily: "Avenir",
  },
});
