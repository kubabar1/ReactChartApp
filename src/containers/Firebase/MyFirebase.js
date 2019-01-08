import firebase from "firebase/app";
import {config} from "../../secret.js"

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
