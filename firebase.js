// Misma configuración y misma colección ("games") que antes: los datos no cambian.
const firebaseConfig = {
  apiKey: "AIzaSyBEtMYOTg4fBGyShbULdGCuW76nwlUIfiI",
  authDomain: "ethosgames-a1bc1.firebaseapp.com",
  projectId: "ethosgames-a1bc1",
  storageBucket: "ethosgames-a1bc1.firebasestorage.app",
  messagingSenderId: "877649560017",
  appId: "1:877649560017:web:598a7bc006323627ab60f0"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
