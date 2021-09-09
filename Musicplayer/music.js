//getting data ready;
const params = new URLSearchParams(window.location.search);
const Id = params.get('Id');
const music = new Audio();   
HOST = 'https://youmusicc.herokuapp.com';

fetch(`${HOST}/audio/info/${Id}`)
.then(res => res.json())
.then(json => {
    document.getElementById("title").innerHTML = json.Title;
    document.querySelector('img').src = json.Thumbnail;

    // load audio once information if fetched  
    music.src = `${HOST}/audio/stream/${Id}`
    music.preload = "auto"
})
.catch(error => console.log('Unable to fetch information regarding this song '+error.message))

document.getElementById("download").href = `${HOST}/audio/download/${Id}`

//adding event handlers
document.querySelector(".play").addEventListener("click",handlePlay)
document.querySelector("#repeat").addEventListener("click",() => music.currentTime = 0)
document.querySelector("#volume").addEventListener("click",handleVolume)
document.querySelector('.seekbar').addEventListener("input",e =>  music.currentTime = e.target.value )
document.querySelector('.volume-range').addEventListener("input", e => music.volume = e.target.value/100)


var playBtn = document.querySelector('.play')
var seekbar = document.querySelector('.seekbar')
var currentTime = document.querySelector('.current-time')
var duration = document.querySelector('.duration')


function handlePlay() {

    if (music.paused) {
        music.play();
        playBtn.className = 'pause'
        playBtn.innerHTML = '<i class="material-icons">pause</i>'
    } 

    else {
        music.pause();
        playBtn.className = 'play'
        playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
    }

    music.addEventListener('ended', () => {
        playBtn.className = 'play'
        playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
        music.currentTime = 0
    });
}

music.onloadeddata = () => {
    seekbar.max = music.duration
    var ds = parseInt(music.duration % 60)
    var dm = parseInt((music.duration / 60) % 60)
    duration.innerHTML = dm + ':' + ds
}

music.ontimeupdate = () => seekbar.value = music.currentTime 

music.addEventListener('timeupdate', () => {
    var cs = parseInt(music.currentTime % 60)
    var cm = parseInt((music.currentTime / 60) % 60)
    currentTime.innerHTML = cm + ':' + cs
}, false)


// volume
var volIcon = document.querySelector('.volume')
var volBox = document.querySelector('.volume-box')
var volumeRange = document.querySelector('.volume-range')
var volumeDown = document.querySelector('.volume-down')
var volumeUp = document.querySelector('.volume-up')

function handleVolume() {
    volIcon.classList.toggle('active')
    volBox.classList.toggle('active')
}

volumeDown.addEventListener('click', handleVolumeDown);
volumeUp.addEventListener('click', handleVolumeUp);

function handleVolumeDown() {
    volumeRange.value = Number(volumeRange.value) - 20
    music.volume = volumeRange.value / 100
}
function handleVolumeUp() {
    volumeRange.value = Number(volumeRange.value) + 20
    music.volume = volumeRange.value / 100
}