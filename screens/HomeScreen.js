import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      // console.log("got categories ", response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch {
      (e) => {
        console.error(e);
        return e;
      };
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log("got recipes ", response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch {
      (e) => {
        console.error(e);
        return e;
      };
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-6 flex-row justify-between items-center mb-2">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <Feather name="bell" size={hp(4)} color={"gray"} />
        </View>

        {/* greetings & punchline */}
        <View className="mx-6 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2.3) }} className="text-neutral-600">
            Hello, <Text className="text-green-700">Zephyrl</Text>
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make you own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* searchbar */}
        <View className="mx-6 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search your food"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <Feather name="search" size={hp(2.5)} color={"gray"} />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
