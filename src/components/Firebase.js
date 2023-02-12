import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGUCRIiz7_z5EozAJp50XfboUk0hC4x1w",
    authDomain: "react-coderhouse-ac264.firebaseapp.com",
    projectId: "react-coderhouse-ac264",
    storageBucket: "react-coderhouse-ac264.appspot.com",
    messagingSenderId: "617942978561",
    appId: "1:617942978561:web:7b098047a1d9d4aa463000"
  };


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);