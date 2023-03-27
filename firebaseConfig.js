// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig  = {
  apiKey: "AIzaSyAmoeNtaIrehHZVG9zTlDotSmkgi-bmwjE",
  authDomain: "bloom-image-upload.firebaseapp.com",
  projectId: "bloom-image-upload",
  storageBucket: "bloom-image-upload.appspot.com",
  messagingSenderId: "562646169268",
  appId: "1:562646169268:web:9dcd13a92d2022abc989e1",
  measurementId: "G-2T42X876RN"
};

const app = initializeApp(firebaseConfig);


export const storage = getStorage();