export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.latitude, lng: location.longitude }; // { lat: 0.12345, long: 123.354 }
    this.id = id;
  }
}
