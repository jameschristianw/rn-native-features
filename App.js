import { StatusBar } from "expo-status-bar";

import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";

import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import { initDB } from "./util/database";
import AppLoading from "expo-app-loading";
import PlaceDetail from "./screens/PlaceDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDBInitialized, setIsDBInitialized] = useState(false);

  useEffect(() => {
    initDB()
      .then(() => {
        setIsDBInitialized(true);
      })
      .catch((error) => {
        console.log("AppLoading error ==>", error);
      });
  }, []);

  if (!isDBInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          })}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={() => ({
              title: "Add a new place",
            })}
          />
          <Stack.Screen name="Map" component={Map} options={{}} />
          <Stack.Screen
            name="PlaceDetail"
            component={PlaceDetail}
            options={() => ({
              title: "Loading detail",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
