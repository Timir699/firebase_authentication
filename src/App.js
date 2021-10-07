import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, GithubAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import initializeFirebase from "./firebase/firebase.init";
import './App.css';
import { useState } from "react";
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'

initializeFirebase()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const auth = getAuth();
  const { email, password } = userData;
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user
        const user = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setLoggedInUser(user)
      })
      .catch(error => console.log(error.message))
  }

  const handleGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user
        const user = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setLoggedInUser(user)
      })
      .catch(error => console.log(error.message))
  }

  const checkHandler = (e) => {
    setIsLoggedIn(e.target.checked);
    console.log(isLoggedIn);
  }

  const formHandler = (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setError('password must be 6 characters')
      return
    }
    isLoggedIn ? loginHandler(email, password) : createUser(email, password)

  }
  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        setSuccess('')
        const user = result.user
        console.log(user);
        setError('')
        setSuccess('Account Created Successfully')
        verifyEmail()
      })
      .catch(error => setError(error.message))
  }
  const loginHandler = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user);
        setError('')

      })
      .catch(error => {
        setError(error.message)
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }
  const passwordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(result => console.log(result))
  }

  const inputHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }



  return (
    <div className="App">

      {loggedInUser.email && <div className="text-center">
        <h2>Name: {loggedInUser.name}</h2>
        <h2>Email: {loggedInUser.email}</h2>
        <img src={loggedInUser.img} alt="" />
      </div>}


      <div className="text-center mt-12">
        <div className="w-2/6 mx-auto">
          <form onSubmit={formHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {!isLoggedIn ? <><label className="block text-gray-500 text-sm font-bold mb-2" for="name">
              UserName
            </label><input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
              onChange={inputHandler} value={userData.name} name='name' /></> : ''}

            <div className="my-2">
              <label className="block text-gray-500 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={inputHandler} value={userData.email} name="email" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******" onChange={inputHandler} value={userData.password} name='password' />
            </div>
            <div className="mb-3">
              <p className="font-semibold text-2xl mb-2 text-gray-500">You can also sign in with</p>
              <FcGoogle style={{ cursor: "pointer" }} className="text-4xl inline mr-2" onClick={handleGoogle} />
              <BsGithub style={{ cursor: "pointer" }} className="text-4xl inline" onClick={handleGithub} />
            </div>
            <label class="md:w-3/3 block text-gray-500 font-bold mb-3" onClick={checkHandler}>
              <input class="mr-2 leading-tight" type="checkbox" />
              <span class="text-sm">
                {!isLoggedIn ? 'Allready signed up! just click here to login' : ' Dont have an account? click here to signup.'}
              </span>
            </label>

            <p className="mb-5 text-red-500"> {error}</p>
            <p className="mb-5 text-green-500"> {success}</p>
            <div className="flex items-center justify-center">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
                {isLoggedIn ? 'Sign in' : 'Sign up'}
              </button>
              <button onClick={passwordReset} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
                reset password
              </button>
            </div>
          </form>

        </div>
      </div>



    </div>
  );
}





export default App;
