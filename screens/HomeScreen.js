import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase";



function Home() {
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation();
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  console.log(profiles);



  return (
    <SafeAreaView style={tw("flex-1 relative")}>
      <View style={tw("items-center relative")}>
        {user && (
          <TouchableOpacity
            onPress={logout}
            style={tw("absolute left-5 top-3")}
          >
            <Image
              style={tw("h-10 w-10 rounded-full")}
              source={{ uri: user.photoUrl }}
            />
          </TouchableOpacity>
        )}


      </View>

      <View style={tw("flex-1 -mt-6")}>

      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
