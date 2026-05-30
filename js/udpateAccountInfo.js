// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

//App variables for communication
let app;
let auth;

//Page
const dir = window.location.pathname
const doc = dir.substring(dir.lastIndexOf('/') + 1)

//Check language
export let isEnglish = doc.includes('En');

//User updates var
let currentUser;
let currentUID;

//Data var
let userReadyResolver;
export const userReady = new Promise((resolve) => {
  userReadyResolver = resolve;
});

let logState = window.history;

//If user comes back to the portal
window.addEventListener("pageshow", function (event) {
  const isBack = event.persisted || window.performance.getEntriesByType("navigation")[0]?.type === "back_forward" || window.performance.getEntriesByType("navigation")[0]?.type === "reload";
  const isLogout = window.location.search === "?logout";

  if (isBack && isLogout) {

    if (isEnglish) {

        Swal.fire({

            title: "Session finished",
            text: 'Try logging in again',

            icon: 'error',
            iconColor: '#915DF5',

            background: "#E4A7F2",
            color: "#915DF5"

        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                // Redirect to the desired URL after confirmation
                window.location.href = '../html/loginEn.php';
            }
        })

    } else {

        Swal.fire({

            title: "Sesión finalizada",
            text: 'Intenta ingresar nuevamente',

            icon: 'error',
            iconColor: '#915DF5',

            background: "#E4A7F2",
            color: "#915DF5"

        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                // Redirect to the desired URL after confirmation
                window.location.href = '../html/loginEs.php';
            }
        })

    }
  }
});


// Your web app's Firebase configuration
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

initFirebase();

function startApp(){

    //Update user
    onAuthStateChanged(auth, (user) => {

        //If there's an user to update
        if(user != currentUser && user){

            currentUser = user
            currentUID = user.uid

            userReadyResolver({ currentUser, currentUID });

        }
        //If the error and the user goes back
        else if(!user && window.location.href.indexOf('?logged') > -1){

            logState.pushState({page: 'logout'}, null, '?logout')

            if(isEnglish){

                Swal.fire({

                    title: "Logging Out",
                    text: 'Thank you for logging in',

                    background: "#E4A7F2",
                    color: "#915DF5"

                }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                // Redirect to the desired URL after confirmation
                window.location.href = '../html/mainEn.html';
                }
                })

            } else{

                Swal.fire({

                    title: "Cerrando sesión",
                    text: 'Gracias por ingresar',

                    background: "#E4A7F2",
                    color: "#915DF5"

                }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                // Redirect to the desired URL after confirmation
                window.location.href = '../html/mainEs.html';
                }
                })

            }

        }

    })

}

export function getCurrentUser() {
        
    return currentUser;

}

export function getCurrentUID() {
    
    return currentUID;

}