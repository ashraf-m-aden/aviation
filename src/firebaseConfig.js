import firebase from "firebase/app";
import "firebase/storage";
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyAlw6UL5PLeW9uKMfLU9c15Mx2FjZQcD8Y",
  authDomain: "aviation-57c71.firebaseapp.com",
  projectId: "aviation-57c71",
  storageBucket: "aviation-57c71.appspot.com",
  messagingSenderId: "534713185731",
  appId: "1:534713185731:web:174b15fa7eecd057cdb976",
  measurementId: "G-6M1272WENT"
};

// Get a Firestore instance
export const fb = firebase.initializeApp(config)
export const db = fb.firestore()
export const storage = firebase.storage;



// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }


