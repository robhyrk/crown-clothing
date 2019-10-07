import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDiIG1RSliLnI5pk_0IkGeH7hACsXBaVYg",
    authDomain: "crown-clothing-23990.firebaseapp.com",
    databaseURL: "https://crown-clothing-23990.firebaseio.com",
    projectId: "crown-clothing-23990",
    storageBucket: "",
    messagingSenderId: "579081068036",
    appId: "1:579081068036:web:40231011c493a2c9485f51",
    measurementId: "G-7MFRR0GCVK"
  };

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
