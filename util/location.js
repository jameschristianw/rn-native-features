const GOOGLE_API_KEY = "AIzaSyCds1SE0pKInApjNGhFXxz5kM450YT5Yxk";

export const getMapPreview = (latitude, longitude) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};
