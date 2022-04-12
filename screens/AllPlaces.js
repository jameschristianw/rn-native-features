import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import PlacesList from "../components/Places/PlacesList";

const AllPlaces = (props) => {
  const { route } = props;

  const [loadedPlaces, setLoadedPlace] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlace((currentPlaces) => [...currentPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return (
    <SafeAreaView>
      <PlacesList places={loadedPlaces} />
    </SafeAreaView>
  );
};

export default AllPlaces;
