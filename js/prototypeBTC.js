import songs from '../database/prototypeObj.json' with { type: 'json'}

const lvlBtns = [...document.getElementById('levelList').children]
const diffBtns = [...document.getElementById('difficultyList').children]

const settings = []

const mainMenu = document.querySelector('.mainMenu')
const songTab = document.querySelector('.songSelection')
const gameTab = document.querySelector('.game')

lvlBtns.forEach((btn, id) => {

    btn.addEventListener('click', () => {

        settings[0] = id

        document.getElementById('levelList').classList.add('hidden')
        document.getElementById('difficultyList').classList.remove('hidden')

        setTimeout(() => {

            document.getElementById('levelList').style.display = 'none'
            document.getElementById('difficultyList').style.display = ''
            

        }, 50)

    })
    
})

diffBtns.forEach((btn, id) => {

    btn.addEventListener('click', () => {

        settings[1] = id

        console.log(settings, songs.find(l => l.id == settings[0]))

        generateList(songs.find(l => l.id == settings[0]))

        
    })
    
})

function generateList (songsToSelect) {

    if (settings[1] == 0) {

        document.getElementById('difficultyList').classList.add('hidden')
        document.getElementById('levelList').classList.remove('hidden')

        setTimeout(() => {

            document.getElementById('difficultyList').style.display = 'none'
            document.getElementById('levelList').style.display = ''

        }, 50)

        return

    }

    mainMenu.classList.remove('appear')
    songTab.classList.add('appear')

    const songsPool = songTab.querySelector('.songsPool')

    songsPool.innerHTML = ''

    songsToSelect.songs.forEach(song => {

        const playingVid = document.createElement('div')
        playingVid.classList.add('playingVid')

            const thumbnail = document.createElement('img')
            const videoId = song.video.slice(29, song.video.indexOf('?'))
            thumbnail.src = song.image

            const information = document.createElement('div')

                const titleSong = document.createElement('h3')
                titleSong.innerText = song.name

                const bandSong = document.createElement('p')
                bandSong.innerText = song.band

                information.append(titleSong, bandSong)

            playingVid.append(thumbnail, information)

        songsPool.append(playingVid)

        playingVid.addEventListener('click', () => {

            playGame(song)

        })
        
    })

    document.getElementById('backToOpt').addEventListener('click', () => {

        songTab.classList.remove('appear')
        mainMenu.classList.add('appear')

    })


}

function playGame (song) {

    gameTab.classList.add('appear')
    songTab.classList.remove('appear')

    const video = gameTab.querySelector('video')
    const lyricsCont = gameTab.querySelector('.lyricsWrap')
    let position = 0

    video.removeAttribute('controls')
    video.src = song.video

    setInterval(() => {
        contador.textContent = numero;

        if (numero === 0) {
            clearInterval(intervalo);
            contador.style.display = "none"; // Oculta el contador
            video.play(); // Inicia el video
        }

        numero--;
    }, 1000);

}