
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import getAuth from Firebase Auth SDK

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyDjNTQihFnGefsa1uVqxBV3jB3Zx8gouN0",
     authDomain: "bytewave-1e68a.firebaseapp.com",
     projectId: "bytewave-1e68a",
     storageBucket: "bytewave-1e68a.appspot.com",
     messagingSenderId: "362705383181",
    appId: "1:362705383181:web:fd03c0ef50849bdbbe0a44"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp); // Initialize auth object

export { firebaseApp, firestore, storage, auth }; // Export auth object

// Function to authenticate a user with email and password
// Implement your authentication functions here, if needed

  

//   // Import the functions you need from the SDKs you need

// import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDjNTQihFnGefsa1uVqxBV3jB3Zx8gouN0",
//   authDomain: "bytewave-1e68a.firebaseapp.com",
//   projectId: "bytewave-1e68a",
//   storageBucket: "bytewave-1e68a.appspot.com",
//   messagingSenderId: "362705383181",
//   appId: "1:362705383181:web:fd03c0ef50849bdbbe0a44"

// };
//   // Your Firebase configuration
 
  
//   // Initialize Firebase
//   const firebaseApp = initializeApp(firebaseConfig);
//   const firestore = getFirestore(firebaseApp);
//   const storage = getStorage(firebaseApp);
  
//   export { firebaseApp, firestore, storage };
  
//   // Function to authenticate a user with email and password
  




  