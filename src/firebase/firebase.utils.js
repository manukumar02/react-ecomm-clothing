import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD5cju8NsD2akrAMihVQd6FcfZCJHA4BFs",
  authDomain: "react-ecomm-db-36d7c.firebaseapp.com",
  databaseURL: "https://react-ecomm-db-36d7c.firebaseio.com",
  projectId: "react-ecomm-db-36d7c",
  storageBucket: "react-ecomm-db-36d7c.appspot.com",
  messagingSenderId: "177501474030",
  appId: "1:177501474030:web:f523aec640f5619b3c77ff"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;