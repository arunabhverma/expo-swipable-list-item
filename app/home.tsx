import React, { useCallback, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  LinearTransition,
  SlideOutLeft,
} from "react-native-reanimated";
import SlideToLeft from "@/components/SlideToLeft";
import { SETTING_DATA } from "@/mock";
import { LIST_DATA, LIST_DATA_ITEM } from "@/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [listData, setListData] = useState<LIST_DATA>(SETTING_DATA);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [navigation]);

  const headerRight = useCallback(() => {
    return (
      <View style={{ backgroundColor: "transparent" }}>
        <Ionicons name="add" size={30} color={theme.colors.primary} />
      </View>
    );
  }, []);

  const deleteById = (id: string) => {
    setListData((prev) => prev.filter((item) => item.id !== id));
  };

  const renderItem = (item: LIST_DATA_ITEM, index: number): JSX.Element => {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={SlideOutLeft}
        key={item.id}
        layout={LinearTransition}
      >
        {index !== 0 && <ItemSeparatorComponent />}
        <SlideToLeft onRightPress={() => deleteById(item.id)}>
          <View
            style={[
              styles.listItemContainer,
              {
                backgroundColor: theme.colors.card,
              },
            ]}
          >
            <View
              style={[
                styles.imageContainer,
                {
                  backgroundColor: theme.colors.border,
                },
              ]}
            >
              <Image
                source={{ uri: item.profilePic }}
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.rightContainer}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: theme.colors.text,
                  },
                ]}
              >
                {item.name}
              </Text>
              <Feather
                name="chevron-right"
                size={24}
                color={theme.colors.text}
              />
            </View>
          </View>
        </SlideToLeft>
      </Animated.View>
    );
  };

  const ItemSeparatorComponent = () => {
    return (
      <View style={{ backgroundColor: theme.colors.card }}>
        <View style={styles.separatorLine} />
      </View>
    );
  };
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Animated.View layout={LinearTransition} style={styles.listContainer}>
        {listData.map(renderItem)}
      </Animated.View>

      {listData?.length === 0 && (
        <Animated.Text
          entering={FadeInDown}
          exiting={FadeOut}
          style={styles.noDataText}
        >
          No items available. Click the '+' button to create a new one.
        </Animated.Text>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "rgba(100,100,100,0.1)",
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    overflow: "hidden",
  },
  separatorLine: {
    backgroundColor: "rgba(100,100,100,0.1)",
    height: 2,
    marginLeft: 74,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 50,
    marginVertical: 10,
    marginHorizontal: 12,
    aspectRatio: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  imageStyle: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12,
  },
  textStyle: {
    fontSize: 18,
  },
  noDataText: {
    marginTop: 20,
    fontSize: 18,
    color: "#666666",
    marginHorizontal: 30,
    textAlign: "center",
  },
});
