//Traigo una funcion que me conecta la app de React (codigo del front end ) con la plataforma de firebase
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


//Esta es una variable que representa "la plataforma" en si
const app = initializeApp(firebaseConfig);//FirebaseApp

//Esta es una variable que representa "la pestaña Firestore Database o la base de datos"
export const db = getFirestore(app);