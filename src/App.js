import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import AuthInit from './firebase/firebase.init'
import { useState } from 'react';

function App() {

  AuthInit()

  const GoogleProvider = new GoogleAuthProvider();

  const GithubProvider = new GithubAuthProvider();

  const [loggedInUser, setLoggedInUser] = useState({})

  const auth = getAuth();

  const handleGoogleLogIn = () => {

    signInWithPopup(auth, GoogleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        console.log(result.user);
        const user = {
          name: displayName,
          email: email,
          image: photoURL
        }
        setLoggedInUser(user)
      })
      .catch(error => console.log(error.message))
  }


  const handleGitHubLogIn = () => {

    signInWithPopup(auth, GithubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        console.log(result.user);
        const user = {
          name: displayName,
          email: email,
          image: photoURL
        }
        setLoggedInUser(user)
      })
      .catch(error => console.log(error.message))
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setLoggedInUser({})
      })
  }


  return (
    <div className="App">
      <button onClick={handleGoogleLogIn}>sign in with google account</button>
      <button onClick={handleGitHubLogIn}>sign in with github account</button>
      {loggedInUser.name ? <button onClick={handleSignOut}>sign out</button> : ''}
      {
        loggedInUser.name && <div>
          <img src={loggedInUser.image} alt="" />
          <h2>name {loggedInUser.name}</h2>
          <h2>name {loggedInUser.email}</h2>
        </div>
      }

    </div>
  );
}

export default App;
