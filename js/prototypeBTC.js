import songs from '../database/prototypeObj.json' with { type: 'json'}

const lvlBtns = [...document.getElementById('levelList').children]
const diffBtns = [...document.getElementById('difficultyList').children]

const settings = []

const mainMenu = document.querySelector('.mainMenu')
const songTab = document.querySelector('.songSelection')
const gameTab = document.querySelector('.game')

let scoreOnGames = 0

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

    let gameActive = true

    gameTab.classList.add('appear')
    songTab.classList.remove('appear')

    const video = gameTab.querySelector('video')
    const lyricsChild = [...gameTab.querySelector('.lyricsWrap').children]
    let position = 0

    video.removeAttribute('controls')
    video.src = song.video

    video.addEventListener("loadeddata", () => {

        countdown()
        updateLyrics()

    })

    lyricsChild.forEach(lyric => {

        lyric.innerText = '...'
        
    })

    function updateLyrics() {

        if (!gameActive) return

        const time = video.currentTime

        const currentIndex = song.lyrics.findIndex(line => time >= line.time && time < (song.lyrics[song.lyrics.indexOf(line)+1].time ?? video.duration))

        if (currentIndex !== -1) {

            position = time
            renderLyrics(currentIndex, time)

        }

        requestAnimationFrame(updateLyrics)

    }

    const exitHandler = () => {

        gameActive = false

        video.pause()
        video.removeAttribute('src')
        video.load()

        songTab.classList.add('appear')
        gameTab.classList.remove('appear')

        goBackBtn.removeEventListener('click', exitHandler)
    }

    document.getElementById('goBackBtn').addEventListener('click', exitHandler)

    function renderLyrics(index, time) {

        lyricsChild[0].innerText = song.lyrics[index - 1]?.text || ""

        lyricsChild[1].innerText = song.lyrics[index].text

        lyricsChild[2].innerText = song.lyrics[index + 1]?.text || ""

    }


    function countdown () {

        let count = 3

        const counter = setInterval(() => {

            lyricsChild[1].textContent = count

            if (count === 0) {
                clearInterval(counter)
                video.play()
            }

            count--

        }, 1000)

    }

    

}