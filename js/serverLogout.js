// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

//App variables for communication
let app;
let auth;

//Objects
const logoutBtn = document.getElementById('logout');

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

    logoutBtn.addEventListener('click', (e) => {

        e.preventDefault();
        auth.signOut().then(() => {

            console.log('Logout')

        })

    })


}