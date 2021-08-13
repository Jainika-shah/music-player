// Getting elements
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeElm = document.getElementById('current-time');
const durationElm = document.getElementById('duration');

// Initialization
let currentSongIndex = 0;
let isPlaying = false;


// songs list
const songs = [
    {
        name : 'music-1',
        displayName : 'Electric Mil',
        artist : 'Jacintosh Kren'
    },
    {
        name : 'music-2',
        displayName : 'Lost you',
        artist : 'Merena gates'
    },
    {
        name : 'music-3',
        displayName : 'Lets do',
        artist : 'ken neagoie'
    },
    {
        name : 'music-4',
        displayName : 'Front row',
        artist : 'Maxi milin'
    },
];



// play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// load songs
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `static/${song.name}.jpg`;
}

//next btn functionality
function nextSong(){
    currentSongIndex++;
    if(currentSongIndex > songs.length-1){
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

//previous btn functionality
function prevSong(){
    currentSongIndex--;
    if(currentSongIndex < 0){
        currentSongIndex = songs.length-1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

// update time and progress bar
function updateProgressBar(e){
    if(isPlaying){
        
        // getting required values from e parameter
        let { duration, currentTime } = e.srcElement;

        // setting progress bar 
        let progressPercent = ( currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`; 
        
        // setting song duration
        const durationMins = Math.floor(duration / 60);
        let durationSecs = Math.floor(duration % 60);
        if(durationSecs < 10){
            durationSecs = `0${durationSecs}`;
        }
        const completeDuration = `${durationMins}:${durationSecs}`;
        if (durationSecs){
            durationElm.textContent = completeDuration;
        }

        // setting current time of song.
        const currentMins = Math.floor(currentTime / 60);
        let currentSecs = Math.floor(currentTime % 60);
        if(currentSecs < 10){
            currentSecs = `0${currentSecs}`;
        }
        const completeTime = `${currentMins}:${currentSecs}`;
        currentTimeElm.textContent = completeTime;

    }
}

// click anywhere in progressbar functionality
function setProgressbar(e){
    const width = this.clientWidth;
    const userClick = e.offsetX;
    const {duration} = music;
    music.currentTime = (userClick / width) * duration;
}


// play or pause listener
playBtn.addEventListener('click',()=>{
    (isPlaying ? pauseSong() : playSong())
});


// setting the default song on page load.
loadSong(songs[currentSongIndex]);

// prev and next btn listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click',nextSong);

//time and progressBar
music.addEventListener('timeupdate',updateProgressBar);

// automatically starting next song as the current song ends
music.addEventListener('ended', nextSong);

// functionality of clicking anywhere in progress bar and starting from there.
progressContainer.addEventListener('click',setProgressbar);

