import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgJRneNVfvvv06yLYTGQqrZ-dVMJqSvUc",
  authDomain: "shopping-4a6bc.firebaseapp.com",
  projectId: "shopping-4a6bc",
  storageBucket: "shopping-4a6bc.appspot.com",
  messagingSenderId: "650821139975",
  appId: "1:650821139975:web:f00475170456247add34a2",
  measurementId: "G-FL8HX0B9L8"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };