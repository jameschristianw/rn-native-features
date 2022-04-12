import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import OutlineButton from "../components/UI/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetail } from "../util/database";

const PlaceDetail = (props) => {
  const { route, navigation } = props;

  const selectedPlaceId = route.params.placeId;

  const [place, setPlace] = useState();

  function showOnMapHandler() {
    console.log(place);

    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  }

  useEffect(() => {
    async function loadPlaceData() {
      const result = await fetchPlaceDetail(selectedPlaceId);
      setPlace(result);
      navigation.setOptions({
        title: result.title,
      });
    }
    setTimeout(() => loadPlaceData(), 2000);
    // loadPlaceData();
  }, [selectedPlaceId]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlineButton icon={"map"} onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "30%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlaceDetail;
