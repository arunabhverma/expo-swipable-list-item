import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";

const Main = () => {
  const theme = useTheme();
  return (
    <View style={styles.containerCenter}>
      <Link href={"/home"}>
        <Text style={{ color: theme.colors.text }}>Home</Text>
      </Link>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
