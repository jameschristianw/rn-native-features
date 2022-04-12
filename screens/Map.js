import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from "react-native";
import { useState, useLayoutEffect, useCallback } from "react";
import IconButton from "../components/UI/IconButton";

const Map = (props) => {
  const { navigation, route } = props;
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLong: selectedLocation.lng,
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  useLayoutEffect(() => {
    if (initialLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          onPress={savePickedLocationHandler}
          size={24}
          color={tintColor}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  const region = {
    latitude: initialLocation ? initialLocation.lat : -6.224021,
    longitude: initialLocation ? initialLocation.lng : 106.843756,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) return;

    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: long });
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
