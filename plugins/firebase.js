import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBr4UXy-ohCSnlpdZg9GUuEUbgnvOYbZbI",
  authDomain: "muscle-log-app.firebaseapp.com",
  projectId: "muscle-log-app",
  storageBucket: "muscle-log-app.appspot.com",
  messagingSenderId: "572455816920",
  appId: "1:572455816920:web:11fed50d5dc696c62351ad"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
}

export default firebase;