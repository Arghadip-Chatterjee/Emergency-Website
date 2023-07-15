import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6OVmSmyIL7CSYnx8qe2aaNLiW6Odnd44",
  authDomain: "emergency-services-avenir2023.firebaseapp.com",
  projectId: "emergency-services-avenir2023",
  storageBucket: "emergency-services-avenir2023.appspot.com",
  messagingSenderId: "122370493259",
  appId: "1:122370493259:web:afcd4b54fadcbda7e6f6ce",
  measurementId: "G-YCZBG66BZL"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
