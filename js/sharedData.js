import { userReady, getCurrentUID } from './udpateAccountInfo.js';
import { encryptString } from './encryptedData.js';

let dataReadyResolver;
export const dataReady = new Promise((resolve) => {
  dataReadyResolver = resolve;
});

let userData = [];

userReady.then(() => {
  const uid = getCurrentUID();
  const id = encryptString(uid)

  fetch('../database/users.json')
    .then(response => response.json())
    .then(data => {

      const match = data.find(obj => obj.idKey === id);

      if (match) {
        
        userData.push(match.data)
        userData = userData.flat()

        dataReadyResolver({userData})

      } else {
        
        //Create a new one
        console.log("No match found");

      }
    })

    .catch(error => console.error('Error loading JSON:', error));

});

export function currentUserData(){

    return userData;

}