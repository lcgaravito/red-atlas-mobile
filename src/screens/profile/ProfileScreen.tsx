import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "../../components";
import { useAppDispatch } from "../../redux";
import { logOut } from "../../redux/slices/userSlice";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <View style={styles.root}>
      <Text>ProfileScreen</Text>
      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
