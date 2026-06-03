import { getCurrentUID, isEnglish } from './udpateAccountInfo.js';
import { dataReady, currentUserData } from './sharedData.js';
import { encryptString } from './encryptedData.js';

let userData = []

let logState = window.history;

dataReady.then(() => {

    const userCaughtInfo = currentUserData();

    userData.push(userCaughtInfo)
    userData = userData.flat()

    //Functions
    const a = url();
    const b = titles();
    const c = pageMenu();
    const d = sessionMenu();

    logState.pushState({url: a, userType: b, currentPageMenu: c, currentSessionMenu: d}, null, '?logged' + '.url=' + a + '%userType=' + b + '%currentPageMenu=' + c + '%currentSessionMenu=' + d)

})

function url(){

    const uid = getCurrentUID();
    const id = encryptString(uid)

    console.log(id)

    return id;

}

function titles(){
        
    const role = userData[1].role

    const roleDesc = {

        true: { // English
            a: "administrator",
            t: "teacher",
            s: "student",
            n: "no role"
        },

        false: { // Spanish
            a: "administrador",
            t: "profesor",
            s: "estudiante",
            n: "sin rol"
        }

    };

    console.log(roleDesc[isEnglish][role])

    if(isEnglish){

        document.title = roleDesc[isEnglish][role] + ' portal - English Adventure'

    }else {

        document.title = 'Portal de ' + roleDesc[isEnglish][role] + ' - English Adventure'

    }

    return role;

}

function pageMenu(){

    return;

}

function sessionMenu(){

    return;

}