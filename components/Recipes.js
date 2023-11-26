import { View, Text, Pressable, Image } from "react-native";
import React from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { CachedImage } from "../helpers/image";

export default function Recipes({ categories, meals }) {
  const navigation = useNavigation();

  return (
    <View className="mx-6 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="text-neutral-600 font-semibold"
      >
        Recipes
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipesCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipesCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={() => navigation.navigate("RecipesDetail", { ...item })}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        /> */}
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag={item.strMeal}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
