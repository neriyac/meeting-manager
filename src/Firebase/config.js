import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDkpNjiFBzgpXvwOPFbpx6EV9MKpNLKE88",
  authDomain: "neryos--meeting-manager.firebaseapp.com",
  projectId: "neryos--meeting-manager",
  storageBucket: "neryos--meeting-manager.appspot.com",
  messagingSenderId: "427873723743",
  appId: "1:427873723743:web:303917caee23f5d97682ea"
};


//   init firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, projectStorage, timestamp }
