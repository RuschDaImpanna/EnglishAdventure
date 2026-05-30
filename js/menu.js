//Menu buttons
const menuButton = document.getElementById('menuButton')
const menuCheck = document.getElementById('menuToggle')

const menu = document.getElementById('menuWrapper')

//Menu button
menuCheck.addEventListener('change', () => {

    if (menuCheck.checked) {

        menuButton.textContent = 'close'

    } else {

        menuButton.textContent = 'dehaze'

    }

})

//Click outside
document.addEventListener('click', e => {

    if(!menu.contains(e.target) && e.target !== menuButton){

        menuCheck.checked = false
        menuButton.textContent = 'dehaze'

    }

})

//Easter egg
document.addEventListener('keydown', (r) => {

    if (r.key == 'r') {

        alert('My name is Rusch Da Impanna. This is my top secret room. Keep it between us, OK?')
        window.location.replace('adventure.html')

    }

})