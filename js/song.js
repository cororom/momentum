const musicContainer = document.querySelector(".song");
const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".backward");
const nextBtn = document.querySelector(".forward");
const randomBtn = document.querySelector(".random");
const repeatBtn = document.querySelector(".repeat");

const audio = document.getElementById('audio');
const progress = document.querySelector(".progress__played");
const progressContainer = document.querySelector(".progress__bar");
const title = document.querySelector(".song__title");
const artist = document.querySelector(".song__artist");
const cover = document.querySelector(".song__data img");
const currTime = document.querySelector(".progress__time span:first-child");
const durTime = document.querySelector(".progress__time span:last-child");

// Song titles
const songs = [
  "Carl Storm - With You In The Morning",
  "Jake Miller - Parties",
  "Aria Ohlsson - Love On The Weekend",
  "Munn - I Pick Loneliness",
  "Gervs - Another Day"
];

// Keep track of song
let songIndex = 0;
let initDurTime = 0;
let randomIndex;
let repeatBoolean = false;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  const songInfo = song.split(" - ");
  title.innerText = songInfo[1];
  artist.innerText = songInfo[0];
  audio.src = `music/${song}.mp3`;
  cover.src = `image/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  if (repeatBoolean === false && randomIndex === undefined) {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
  }
  if (randomIndex !== undefined) {
    songIndex = randomIndex;
    randomIndex = setRandomIndex();
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  if (repeatBoolean === false && randomIndex === undefined) {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  }
  if (randomIndex !== undefined) {
    songIndex = randomIndex;
    randomIndex = setRandomIndex();
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Song index random setting
function setRandomIndex() {
  let randomNumber;
  while (true) {
    const tempIndex = Math.floor(Math.random() * 5);
    if (songIndex !== tempIndex) {
      randomNumber = tempIndex;
      break;
    }
  }
  return randomNumber;
}

// Next song random
function randomSong() {
  repeatBoolean = false;
  repeatBtn.querySelector("i.fa-solid").classList.remove("active");
  if (randomBtn.querySelector("i.fa-solid").classList.contains("active")) {
    randomIndex = undefined;
    randomBtn.querySelector("i.fa-solid").classList.remove("active");
  } else {
    let randomNumber = setRandomIndex();
    randomIndex = randomNumber;
    randomBtn.querySelector("i.fa-solid").classList.add("active");
  }
}

// Repeat song
function repeatSong() {
  repeatBoolean = (repeatBoolean === false) ? true : false;
  randomIndex = undefined;
  randomBtn.querySelector("i.fa-solid").classList.remove("active");
  if (repeatBoolean === true) {
    repeatBtn.querySelector("i.fa-solid").classList.add("active");
  } else {
    repeatBtn.querySelector("i.fa-solid").classList.remove("active");
  }
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Set progress time
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  currTime.innerText = setTimeFormat(currentTime);
  if (isNaN(duration)) {
    audio.onloadedmetadata = () => {
      initDurTime = audio.duration;
      durTime.innerText = setTimeFormat(initDurTime);
    };
  } else {
    durTime.innerText = setTimeFormat(duration);
  }
}

// Set time format
function setTimeFormat(time) {
  const number = parseInt(time);
  const minutes = String(Math.floor(number / 60)).padStart(2, "0");
  const seconds = String(Math.floor(number - minutes * 60)).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
randomBtn.addEventListener("click", randomSong);
repeatBtn.addEventListener("click", repeatSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);