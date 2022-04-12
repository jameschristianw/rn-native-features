import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = (props) => {
  const { navigation } = props;

  const createPlaceHandler = (place) => {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
