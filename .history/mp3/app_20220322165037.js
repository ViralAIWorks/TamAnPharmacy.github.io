const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [{
        id: 1,
        title: "Relieve",
        file: "./mp3/music/432Hz.mp3",
        image: "https://gearbox.imgix.net/https%3A%2F%2Fix-www.imgix.net%2Fsolutions%2Fbeach.jpg?w=200&h=200&fit=crop&ixlib=js-2.0.0&s=17fe69d24b3682ea72f1606c8560d5dc",
    },
    {
        id: 2,
        title: "Free",
        file: "528Hz.mp3",
        image: "https://gearbox.imgix.net/https%3A%2F%2Fix-www.imgix.net%2Fsolutions%2Frabbit.jpg?cs=srgb&auto=format&fm=pjpg&fit=crop&w=456&h=342&ixlib=js-2.0.0&s=dc17004d89dc8f66cb2d8df31719d3a6",
    },
]

let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function() {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {
        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
});
nextBtn.addEventListener("click", function() {
    changeSong(1);
});
prevBtn.addEventListener("click", function() {
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);

function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        // handle repeat song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}

function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute("src", `./music/${musics[indexSong].file}`);
    playPause();
}
playBtn.addEventListener("click", playPause);

function playPause() {
    if (isPlaying) {
        musicThumbnail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);

function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);