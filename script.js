console.log("Welcome to Spotify");
//Initialize variables which are required for further use as global variables
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let Index = 0;
let lastIndex = 0;
let lastTime = 0;
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
//list of songs stored as object in songs array
let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Rema, Selena Gomez - Calm Down", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Shakira - Hips Don't Lie ft. Wyclef Jean", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Coolio - Gangsta's Paradise (feat. L.V.)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Rauf & Faik — детство", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Aqua - Barbie Girl", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Luis Fonsi & Daddy Yankee - Despacito", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" }
]

//Listen to events and updating progress bar of music
audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

//we can change audio timing by sliding progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//Handling masterplay of each songs which are nearby of music list
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//this will play music of songItemPlay list on clicking each song or even it's work on clicking on masterplay as it contains play circle
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        //if music is already played
        if (e.target.classList.contains('fa-play-circle')) {
            makeAllPlays();
            //it is used to handle the case when we click on masterplay to avoid type error of reading undefined of index
            if (e.target.id != 'masterPlay') {
                Index = parseInt(e.target.id);
            }
            //removing play button and adding pause button on the song which is currently played
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            //changing audio element source
            audioElement.src = `songs/${Index + 1}.mp3`;
            //changing title name at bottom left of spotify
            masterSongName.innerText = songs[Index].songName;
            //if we play same song after pausing it
            if (lastIndex == Index) {
                audioElement.currentTime = lastTime;
            }
            else {
                audioElement.currentTime = 0;
            }
            audioElement.play();
            gif.style.opacity = 1;
            //changing play button to pause button of masterplay
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        }
        else {
            //if song is pause
            lastIndex = parseInt(e.target.id);;
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            //handling time of song upto which it played,it will help to resume same song again if we press play button
            lastTime = audioElement.currentTime;
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
        }
    })
})

//handling previous button
document.getElementById("previous").addEventListener('click', () => {
    //if we are at starting song
    if (Index <= 0) {
        Index = 0;
    }
    else {
        Index -= 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${Index + 1}.mp3`;
    masterSongName.innerText = songs[Index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    //whichsong is used to handle button of song which are in the songlist when we click on previous button which are at center 
    let whichsong = document.getElementById(`${Index}`);
    whichsong.classList.remove('fa-play-circle');
    whichsong.classList.add("fa-pause-circle");
})

document.getElementById("next").addEventListener('click', () => {
    //if we are at last song of our playlist
    if (Index >= 6) {
        Index = 0;
    }
    else {
        Index += 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${Index + 1}.mp3`;
    masterSongName.innerText = songs[Index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    let whichsong = document.getElementById(`${Index}`);
    whichsong.classList.remove('fa-play-circle');
    whichsong.classList.add("fa-pause-circle");
})

//Handling masterplay
masterPlay.addEventListener('click', () => {
    //whichsong is used to know which song is currently running
    let whichsong = document.getElementById(`${Index}`);
    //if audio is paused
    if (audioElement.paused) {
        //alternating button
        whichsong.classList.remove('fa-pause-circle');
        whichsong.classList.add('fa-play-circle');
        //stoping song
        audioElement.pause();
        //storing last index
        lastIndex = Index;
        //last time upto which song played
        lastTime = audioElement.currentTime;
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
    }
    else {
        //if audio is played
        makeAllPlays();
        //alternating whichsong button
        whichsong.classList.remove('fa-play-circle');
        whichsong.classList.add("fa-pause-circle");
        //alternating masterplay button
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        //if we resuming same song
        if (lastIndex == Index) {
            audioElement.currentTime = lastTime;
        }
    }
})

function myFunction(x) {
    let size = document.getElementsByClassName('size');
    if (x.matches) { // If media query matches
        for (i = 0; i < size.length; i++) {
            size[i].classList.remove("fa-2x");
            size[i].classList.add("fa-1x");
        }

        songs = [
            { songName: "Warriyo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
            { songName: "Calm Down", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
            { songName: "Hips Don't Lie", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
            { songName: "Paradise", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
            { songName: "детство", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
            { songName: "Barbie Girl", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
            { songName: "Despacito", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" }
        ]

        songItems.forEach((element, i) => {
            element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        })
        masterSongName.innerText = songs[Index].songName;

    } else {
        for (i = 0; i < size.length; i++) {
            size[i].classList.remove("fa-1x");
            size[i].classList.add("fa-2x");
        }

        songs = [
            { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
            { songName: "Rema, Selena Gomez - Calm Down", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
            { songName: "Shakira - Hips Don't Lie ft. Wyclef Jean", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
            { songName: "Coolio - Gangsta's Paradise (feat. L.V.)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
            { songName: "Rauf & Faik — детство", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
            { songName: "Aqua - Barbie Girl", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
            { songName: "Luis Fonsi & Daddy Yankee - Despacito", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" }
        ]

        songItems.forEach((element, i) => {
            element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        })
        masterSongName.innerText = songs[Index].songName;
    }
}

var x = window.matchMedia("(max-width: 600px)")
myFunction(x) // Call listener function at run time
x.addEventListener('change', myFunction) // Attach listener function on state changes

songItems.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

