import songs from '../database/prototypeObj.json' with { type: 'json'}

const lvlBtns = [...document.getElementById('levelList').children]
const diffBtns = [...document.getElementById('difficultyList').children]

const settings = []

const mainMenu = document.querySelector('.mainMenu')
const songTab = document.querySelector('.songSelection')
const gameTab = document.querySelector('.game')
const gameUI = [...document.querySelector('.gameData').children]

let scoreOnGames = 0
let streak = 0
let hp = 3

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

        const isAvailable = song.compatible[settings[1]-1]
        console.log(isAvailable)

        const playingVid = document.createElement('div')
        playingVid.classList.add('playingVid')
        if (!isAvailable) playingVid.classList.add('notSupport')

            const check = document.createElement('img')
            check.classList.add('check')
            check.src ='https://cdn-icons-png.flaticon.com/512/845/845646.png'

            const thumbnail = document.createElement('img')
            const videoId = song.video.slice(29, song.video.indexOf('?'))
            thumbnail.src = song.image

            const information = document.createElement('div')

                const titleSong = document.createElement('h3')
                titleSong.innerText = song.name

                const bandSong = document.createElement('p')
                bandSong.innerText = song.band

                information.append(titleSong, bandSong)

            playingVid.append(check, thumbnail, information)

        songsPool.append(playingVid)

        if (isAvailable) {

            playingVid.addEventListener('click', () => {

                playGame(song, playingVid)

            })


        }
        
    })

    document.getElementById('backToOpt').addEventListener('click', () => {

        songTab.classList.remove('appear')
        mainMenu.classList.add('appear')

    })


}

function playGame (song, tab) {

    let gameActive = true
    const oldScore = scoreOnGames
    const average = []

    hp = 3
    gameUI[1].innerText = `HP: ♥♥♥`
    gameUI[2].innerText = `Time: 15`
    gameUI[3].innerText = `Score: ${scoreOnGames}`

    gameTab.classList.add('appear')
    songTab.classList.remove('appear')

    const video = gameTab.querySelector('video')
    const lyricsChild = [...gameTab.querySelector('.lyricsWrap').children]
    let indexedTime = 0
    let position = -2

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

        const currentIndex = song.lyrics.findIndex((line, index) => time >= line.time && time < (song.lyrics[index + 1]?.time ?? video.duration))

        indexedTime = time

        if (position !== currentIndex) {

            position = currentIndex
            renderLyrics(currentIndex, time)

        }

        requestAnimationFrame(updateLyrics)

    }

    const exitHandler = () => {

        gameActive = false
        scoreOnGames = oldScore

        video.pause()
        video.currentTime = 0
        video.removeAttribute('src')
        video.load()

        songTab.classList.add('appear')
        gameTab.classList.remove('appear')

        document.getElementById('goBackBtn').removeEventListener('click', exitHandler)

    }

    document.getElementById('goBackBtn').addEventListener('click', exitHandler)

    function renderLyrics(index, time) {

        const lyricToProcess = settings[1] == 3 ? song.negative:song.lyrics

        const lyricsObj = createObjects([[lyricToProcess[index - 1]?.text || "", index - 1], [lyricToProcess[index]?.text || "", index], [lyricToProcess[index + 1]?.text || ""], index + 1])

        lyricsChild[0].innerHTML = lyricsObj[0]

        lyricsChild[1].innerHTML = lyricsObj[1]

        lyricsChild[2].innerHTML = lyricsObj[2]

        const inputsOnLine = [...lyricsChild[1].querySelectorAll('input[type=text]')]

        if (inputsOnLine.length > 0) {

            runOnInput(inputsOnLine, index)

        }

    }

    async function runOnInput(inputs, index) {

        const delayTime = (song.lyrics[index + 1]?.time - song.lyrics[index]?.time)*0.85
        const targetTime = song.lyrics[index]?.time + delayTime;

        const interval = setInterval(() => {

            if (indexedTime >= targetTime) {

                clearInterval(interval)

                let currentCountDown = 15
                const lyricToProcess = settings[1] == 3 ? song.negative:song.lyrics
                const splitText = lyricToProcess[index].text.split(' ')

                if (inputs.every(input =>  input.value.trim().toLowerCase() === splitText[input.id.slice(-1)]?.trim().toLowerCase())) {

                    updateScore(15)
                    return

                }
                video.pause()
                console.log(splitText)

                const timer = setInterval(() => {

                    gameUI[2].innerText = `Time: ${currentCountDown.toFixed(1)}`

                    const allCorrect = inputs.every(input =>  input.value.trim().toLowerCase() === splitText[input.id.slice(-1)]?.trim().toLowerCase())
                    
                    if (allCorrect) {

                        clearInterval(timer)
                        updateScore(currentCountDown)
                        video.play()

                        return

                    }

                    currentCountDown -= 0.1

                    if (currentCountDown <= 0) {

                        clearInterval(timer)
                        updateHP()

                        if (hp <= 0) {

                            scoreOnGames = 0
                            console.log('from death')
                            exitHandler()
                            return

                        }

                        video.play()

                    }
                    

                }, 100)

            }

        }, 10)

        function updateScore (time) {

            streak++
            scoreOnGames += Math.floor(6.667*time + (100 * (1/streak)))
            average.push(time)

            gameUI[3].innerText = `Score: ${scoreOnGames}`

        }

        function updateHP () {

            streak = 0
            hp--
            let hearts = ''

            for (let i = 0; i < hp; i++) {
                
                hearts += '♥'
                
            }
            average.push(0)

            gameUI[1].innerText = `HP: ${hearts}`

        }

    }

    function createObjects (lyricsObj) {

        const conditions = ['#PastTense', '(#Auxiliary|#Copula)', '(#Auxiliary|#PastTense|#PresentTense|#Negative)']
        const lyricsHTML = []

        console.log(lyricsObj)

        lyricsObj.forEach(lyric => {

            const doc = nlp(lyric[0])
            const terms = doc.terms().json().filter(l => l.text !== '')

            console.log(terms)

            let html = ''

            terms.forEach((t, id) => {

                const tags = t.terms[0].tags

                const condition = conditions[settings[1] - 1]

                const isMatch = matchesCondition(tags, condition)

                if (isMatch) {

                    html += `<input type="text" class="inputSong" id='txt${lyric[1]}_${id}'> `

                } else {

                    html += t.text + ' '

                }

            })

            lyricsHTML.push(html.trim())
            
        })

        function matchesCondition(tags, condition) {

            const options = condition.replace(/[()]/g, '').split('|')

            return options.some(opt => {

                opt = opt.replace('#', '')

                return tags.find(t => t == opt)
                
            })

        }

        return lyricsHTML

    }


    function countdown () {

        let count = 3

        const counter = setInterval(() => {

            lyricsChild[1].innerHTML = count

            if (count === 0) {

                clearInterval(counter)
                video.play()

                video.addEventListener('ended', () => {

                    streak = 0
                    let averageSum = 0

                    for (const time of average) {

                        averageSum += time
                        
                    }

                    averageSum = 15 - (averageSum/average.length)

                    Swal.fire({
                        title: "Good job!",
                        html: `
                        <p>You gain <strong id="scoreSum">${oldScore}</strong></p>
                        <p>Average time per answer: <strong>${averageSum.toFixed(2)}</strong></p>
                        `,
                        icon: "success",
                        didOpen: () => {

                            const sumAnim = document.getElementById('scoreSum');

                            const start = oldScore;
                            const end = oldScore + scoreOnGames;
                            const duration = 1000;

                            let startTime = null;

                            function animate(timestamp) {

                                if (!startTime) startTime = timestamp;

                                const progress = Math.min((timestamp - startTime) / duration, 1);

                                const current = Math.floor(
                                    start + (end - start) * progress
                                );

                                sumAnim.textContent = current;

                                if (progress < 1) {
                                    requestAnimationFrame(animate);
                                }

                            }

                            requestAnimationFrame(animate);

                        }
                    }).then(r => {

                        console.log('from end')
                        exitHandler()

                    })

                    tab.querySelector('.check').style.opacity = 1
                    tab.classList.add('done')
                    const newTab = tab.cloneNode(true);
                    tab.replaceWith(newTab);

                })

            }

            count--

        }, 1000)

    }

    

}