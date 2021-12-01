import Rebase from "re-base";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD2j1qiibOmTbkcV_2TIIPrdLtdeHvf7qE",
    authDomain: "very-hot-burgers-104dd.firebaseapp.com",
    projectId: "very-hot-burgers-104dd",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;