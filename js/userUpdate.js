import { encryptString } from './encryptedData.js'

export async function registerUser(user){

    const userInfo = {

        uid: user.uid,
        name: user.name,
        email: user.email

    }

    //Compose JSON 
    const jsonInfo = {

        idKey: encryptString(userInfo.uid),
        data:[

            {

                block : "window",
                pageMenuWindows : [],
                sessionMenuWindows : [

                    {

                        courses:[]

                    }

                ],

                creationMenu : false

            },

            {

                block : "info",
                name : userInfo.name,
                pfp : 0,
                email : userInfo.email,
                role : "n",
                tag : ""

            }

        ]

    }

    //PHP

    console.log("[Sending user to registerUser.php]:", jsonInfo);

    const response = await fetch('./registerUser.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonInfo)
    });

    const result = await response.text();  // text so you can see PHP errors too
    console.log("[Response from PHP]:", result);

}