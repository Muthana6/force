import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD2iowDMb_wf8Lnd_ad1HVKDVfaNTZLbEc",
    authDomain: "thedojositereact.firebaseapp.com",
    projectId: "thedojositereact",
    storageBucket: "thedojositereact.appspot.com",
    messagingSenderId: "335686262675",
    appId: "1:335686262675:web:842341990a300686bed266"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth() // for authentication

const projectStorage = firebase.storage()

const timestamp = firebase.firestore.Timestamp // time Stamp

export {projectFirestore, projectAuth, timestamp, projectStorage}