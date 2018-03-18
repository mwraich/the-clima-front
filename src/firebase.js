import { initializeApp } from "firebase";

// configure the firebase app
const app = initializeApp({
  apiKey: "AIzaSyAjEC9luhQOFuICHRBwlQMSwfpQ1Qu1KO4",
  authDomain: "the-clima.firebaseapp.com",
  databaseURL: "https://the-clima.firebaseio.com",
  projectId: "the-clima",
  // storageBucket: "",
  // messagingSenderId: "165983999849"
});

// get reference to the firebase database
const database = app.database();

// export reference to database
export default database;
