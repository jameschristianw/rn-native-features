import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function initDB() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        (tx, result) => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(
            `insertPlace result ==> ${JSON.stringify(result, null, 2)}`
          );
          resolve(result);
        },
        (_, error) => {
          console.log(
            `insertPlace error ==> ${JSON.stringify(error, null, 2)}`
          );
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          console.log(
            `fetchPlaces result ==> ${JSON.stringify(result, null, 2)}`
          );
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  latitude: dp.lat,
                  longitude: dp.lng,
                },
                dp.id
              )
            );
          }

          resolve(places);
        },
        (_, error) => {
          console.log(
            `fetchPlaces error ==> ${JSON.stringify(error, null, 2)}`
          );
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetail(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          console.log(
            `fetchPlaceDetail(${id}) result ==> ${JSON.stringify(
              result,
              null,
              2
            )}`
          );
          const dbPlace = result.rows._array[0];
          const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            {
              latitude: dbPlace.lat,
              longitude: dbPlace.lng,
              address: dbPlace.address,
            },
            dbPlace.id
          );

          resolve(place);
        },
        (_, error) => {
          console.log(
            `fetchPlaceDetail${id} error ==> ${JSON.stringify(error, null, 2)}`
          );
          reject(error);
        }
      );
    });
  });

  return promise;
}
