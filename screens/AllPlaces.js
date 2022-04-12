import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = (props) => {
  const { route } = props;

  const [loadedPlaces, setLoadedPlace] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlace(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <SafeAreaView>
      <PlacesList places={loadedPlaces} />
    </SafeAreaView>
  );
};

export default AllPlaces;
