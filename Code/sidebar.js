const sidebar = document.getElementById('sidebar');
const popUp= document.getElementById('popUp')
const stopAudioBtnBox= document.getElementById('stopAudioBtnBox')
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
// Sidebar Open / Close
function openSide() {
    sidebar.style.transform = 'translate(0px)';
}
function closeSide() {
    sidebar.style.transform = 'translate(-100%)';
}

function showPopUp(song){
    popUp.style.display = "block";
    document.getElementById('popupImg').src = song.src;
    document.getElementById('popupTitle').innerText = song.Title;
    document.getElementById('popupArtist').innerText = song.Artist;
    document.getElementById('popupArtist2').innerText = song.Artist2;
    document.getElementById('popupArtist3').innerText = song.Artist3===undefined?"":song.Artist3;
    document.getElementById('movie').innerText = song.Movie;
    document.getElementById('lyricist').innerText = song.Lyricist;
    document.getElementById('composer').innerText = song.Composer;
    document.getElementById('year').innerText = song.Year;
    document.getElementById('genre').innerText = song.Genre;
    document.getElementById('mood').innerText = song.Mood;
}

function closePopUp() {
    popUp.style.display = "none";
   stopAudio()
}

function playAudio() {
    audio.play();
    playBtn.innerText = "⏸️";
    stopAudioBtnBox.innerText = "Stop";
}

function stopAudio() {
    audio.pause();
    playBtn.innerText = "▶️";
    stopAudioBtnBox.innerText="Play";
}

stopAudioBtnBox.addEventListener("click",()=>{ 
    audio.paused ? playAudio() : stopAudio();
})

// from here  the progress bar start
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});
function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
    duration.innerText = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    currentTime.innerText = formatTime(audio.currentTime);
});