import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from "react-native";
import { useState, useLayoutEffect, useCallback } from "react";
import IconButton from "../components/UI/IconButton";

const Map = (props) => {
  const { navigation } = props;
  const [selectedLocation, setSelectedLocation] = useState();

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
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
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
  }, [navigation, savePickedLocationHandler]);

  const region = {
    latitude: -6.224021,
    longitude: 106.843756,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
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
