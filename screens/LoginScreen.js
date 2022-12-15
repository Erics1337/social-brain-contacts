import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { user, loading, error, signInWithGoogle, logout } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://preview.redd.it/k35gae3somo41.png?auto=webp&s=07154e8f6b16a8480a5106f2cd62d3f12197f061" }}
      >
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[
            tw("bg-white absolute bottom-40 w-52 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={[tw("font-semibold text-center"), { color: "#FF5864" }]}>
            Sign in
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
