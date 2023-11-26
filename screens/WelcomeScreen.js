import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5))),
      300
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo image with ring */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Image
            source={require("../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          Foodies
        </Text>
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Rain or shine, it’s a fine time to dine
        </Text>
      </View>

      {/* copyright */}
      <View>
        <Text className="text-blue-500 text-lg mt-10">
          Made with ♥ by Zephyrl
        </Text>
      </View>
    </View>
  );
}
