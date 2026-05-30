//Page
const dir = window.location.pathname
const doc = dir.substring(dir.lastIndexOf('/') + 1)

//Check language
let isEnglish = doc.includes('En');

//Buttons for language
const langButton = document.getElementById('langButton')
const langCheck = document.getElementById('langToggle')

const langMenu = document.getElementById('langWrapper')


if (isEnglish){

    langButton.textContent = 'Language: English'

}else{

    langButton.textContent = 'Idioma: Español'

}

//Checkbox language
langCheck.addEventListener('change', () => {

    if (langCheck.checked) {

        if(isEnglish){

            langButton.textContent = 'Language'

        }else{

            langButton.textContent = 'Idioma'

        }

    } else {

        if(isEnglish){

            langButton.textContent = 'Language: English'

        }else{

            langButton.textContent = 'Idioma: Español'

        }

    }

})

//Choosing language
function sameLang () {

    langCheck.checked = false
    
    if(isEnglish){

        langButton.textContent = 'Language: English'

    }else{

        langButton.textContent = 'Idioma: Español'

    }

}

//Click outside
document.addEventListener('click', e => {

    if(!langMenu.contains(e.target) && e.target !== langButton){

        langCheck.checked = false

        if(isEnglish){

            langButton.textContent = 'Language: English'

        }else{

            langButton.textContent = 'Idioma: Español'

        }

    }

})
