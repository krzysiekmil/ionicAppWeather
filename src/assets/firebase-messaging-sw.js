importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase.js');
firebase.initializeApp({
  apiKey: "AIzaSyC_LuJhMAX6U_fYrXXb1utAy9r7TKnAPXU",
  authDomain: "api-project-515150500055.firebaseapp.com",
  databaseURL: "https://api-project-515150500055.firebaseio.com",
  projectId: "api-project-515150500055",
  storageBucket: "api-project-515150500055.appspot.com",
  messagingSenderId: "515150500055"
});
const messaging = firebase.messaging();
