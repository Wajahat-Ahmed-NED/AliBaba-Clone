import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCfCHRnLGVU_WTCSo4CExSsPUUt2DI3q4",
    authDomain: "onlinewebmobile-86b64.firebaseapp.com",
    databaseURL: "https://onlinewebmobile-86b64.firebaseio.com",
    projectId: "onlinewebmobile-86b64",
    storageBucket: "onlinewebmobile-86b64.appspot.com",
    messagingSenderId: "517015724540",
    appId: "1:517015724540:web:1ac5556954d136e9a99279",
    measurementId: "G-EETH73JTVD"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth =firebase.auth();
  export {db , auth };
