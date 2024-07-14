import React, { useRef } from "react";
import { Animated, StyleSheet, View, ViewProps } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

type SLIDE_TO_LEFT_TYPE = {
  onRightPress: () => void;
} & ViewProps;

const SlideToLeft = ({ onRightPress, ...props }: SLIDE_TO_LEFT_TYPE) => {
  const swipeableRowRef = useRef(null);

  const close = () => {
    swipeableRowRef.current?.close();
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-101, -100, -50, 0],
      outputRange: [-1, 0, 0, 20],
    });

    const opacity = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <Button
        onPress={() => {
          onRightPress();
          close();
        }}
      >
        <Animated.View
          style={[
            styles.rightWrapper,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <Animated.View style={[styles.iconWrapper, { opacity: opacity }]}>
            <Ionicons name="trash" size={22} color={"rgba(255,0,0, 0.7)"} />
          </Animated.View>
        </Animated.View>
      </Button>
    );
  };

  return (
    <Swipeable ref={swipeableRowRef} renderRightActions={renderRightActions}>
      <View {...props} />
    </Swipeable>
  );
};

export default SlideToLeft;

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: "rgba(255,0,0,0.2)",
    padding: 10,
    borderRadius: 75,
  },
  rightWrapper: {
    width: 75,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
