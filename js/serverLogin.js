// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, deleteUser, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

//App variables for communication
let app;
let auth;
const provider = new GoogleAuthProvider();

//Objects
const loginBtn = document.getElementById('loginGoogleBtn');
import { isEnglish } from "./udpateAccountInfo.js";

const mailDomain = 'gmail.com'
import { encryptString } from './encryptedData.js';

import { registerUser } from './userUpdate.js'

let usersDir = [];
const response = await fetch('../database/users.json');
usersDir = await response.json();

// Auth keys info from the JSON
async function initFirebase() {
  try {
    const response = await fetch('../database/authInfo.json');
    const config = await response.json();

    app = initializeApp(config);
    auth = getAuth(app);

    startApp();

  } catch (error) {
    console.error('Error loading Firebase config:', error);
  }
}

//Start
initFirebase();

function startApp(){

    auth.languageCode = 'en'

    loginBtn.addEventListener('click', function(){


        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;

            if(correctDomain(user)){

                if (isEnglish){

                    window.location.href = '../html/portalEs.php'

                } else{

                    window.location.href = '../html/portalEs.php'

                }

            } else {

                wrongMail(user, auth)

                if (isEnglish) {

                    Swal.fire({

                        title: "Wrong e-mail",
                        html: 'Please, login with a @iedrinconsanto.com Google account',

                        icon: 'error',
                        iconColor: '#915DF5',

                        background: "#F5C949",
                        color: "#915DF5"

                    })

                } else {

                    Swal.fire({

                        title: "Email incorrecto",
                        html: 'Por favor ingresa con una cuenta de Google de @iedrinconsanto.com',

                        icon: 'error',
                        iconColor: '#915DF5',

                        background: "#F5C949",
                        color: "#915DF5"

                    })

                }

            }

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(errorCode, errorMessage);

            Swal.fire({

                title: "Invalid Operation",
                text: 'Error : "' + errorMessage + '"',

                background: "#F5C949",
                color: "#915DF5"

            })


        });


    })

}

function correctDomain (user){

    const key = encryptString(user.uid)
    const domain = user.email.split('@')[1]

    const userExists = usersDir.some(userObj => userObj.idKey === key)

    if (domain === mailDomain){

        if(!userExists){

            registerUser(user);

        }

        return true;

    } else {

        if(usersDir[0].idKey === key){

            return true;

        } else {

            return false;

        }

    }
}

async function wrongMail(user, auth) {

    try {

        await deleteUser(user);

    } catch (err) {
                    
        console.warn('deleteUser failed (probably disabled):', err.code);
                
    }

    await signOut(auth);
    
}