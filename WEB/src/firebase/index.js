import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "is-manhtb.firebaseapp.com",
    projectId: "is-manhtb",
    storageBucket: "is-manhtb.appspot.com",
    messagingSenderId: "181948662570",
    appId: "1:181948662570:web:afcaf12c65a5c6d5a6d453",
    measurementId: "G-0N5HT6QW44"
  };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
