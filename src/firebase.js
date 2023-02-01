import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import functions from '@react-native-firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyA2WlQAS1NbRQLtm2bVavaA0FVIj0c9whI",
    authDomain: "fir-auth-4a629.firebaseapp.com",
    projectId: "fir-auth-4a629",
    storageBucket: "fir-auth-4a629.appspot.com",
    messagingSenderId: "384088914505",
    appId: "1:384088914505:web:930ebce460410ff8719d98"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

const createUserOnRegistration = () => {
    const [email, setEmail] = useState('');
    const [overall, setOverall] = useState('');
    functions.auth.user().onCreate((user) => {
        console.log(JSON.stringify(user));
    });
}

export  { db, auth };

