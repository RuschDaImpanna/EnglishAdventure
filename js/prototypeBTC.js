import songs from '../database/prototypeObj.json' with { type: 'json'}

const lvlBtns = [...document.getElementById('levelList').children]
const diffBtns = [...document.getElementById('difficultyList').children]

const settings = []

const mainMenu = document.querySelector('.mainMenu')
const songTag = document.querySelector('.songSelection')

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
    songTag.classList.add('appear')

    const songsPool = songTag.querySelector('.songsPool')

    songsPool.innerHTML = ''

    songsToSelect.songs.forEach(song => {

        const playingVid = document.createElement('div')
        playingVid.classList.add('playingVid')

            const thumbnail = document.createElement('img')
            const videoId = song.video.slice(16, song.video.indexOf('?'))
            thumbnail.src = `https://img.youtube.com/vi${videoId}/hqdefault.jpg`

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

        songTag.classList.remove('appear')
        mainMenu.classList.add('appear')

    })


}

function playGame (song) {



}