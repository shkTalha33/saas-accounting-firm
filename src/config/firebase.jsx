// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAa_k3x42mFA-t0uXQhaJJxYWJD21wlKT0",
    authDomain: "tide-tidey.firebaseapp.com",
    projectId: "tide-tidey",
    storageBucket: "tide-tidey.appspot.com",
    messagingSenderId: "2034899931",
    appId: "1:2034899931:web:19f4db04ec95e9bb5425fe"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)

export { app, analytics, storage, }