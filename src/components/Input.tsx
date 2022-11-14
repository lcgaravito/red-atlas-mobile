import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { COLORS } from "../constants";

type InputProps = {
  label: string;
  hasError: boolean;
  error: string;
  touched: boolean;
} & TextInputProps;

const Input = ({
  editable,
  value,
  onChangeText,
  onFocus,
  onBlur,
  maxLength,
  placeholder,
  placeholderTextColor,
  keyboardType,
  label,
  hasError,
  error,
  touched,
  ...props
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
      />
      {hasError && touched && (
        <View style={styles.message}>
          <Text style={styles.helperText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "AvenirBold",
    marginVertical: 5,
  },
  input: {
    paddingVertical: 5,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    width: "90%",
    fontFamily: "Avenir",
    marginBottom: 10,
    paddingHorizontal: 2,
    marginTop: 10,
  },
  message: {
    marginVertical: 5,
  },
  helperText: {
    fontSize: 12,
    fontFamily: "AvenirBold",
    color: "#ff0000",
  },
});
