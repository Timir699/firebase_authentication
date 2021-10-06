import firebaseConfig from './firebase.config'
import { initializeApp } from "firebase/app";


const AuthInit = () => {
    initializeApp(firebaseConfig)
}

export default AuthInit