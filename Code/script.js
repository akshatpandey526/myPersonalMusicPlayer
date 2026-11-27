const container = document.getElementById('container');
const titleOne = document.getElementById('titleOne');
const titleTwo = document.getElementById('titleTwo');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const audio = document.getElementById('audio');
const ArtistPic = document.getElementById('ArtistPic');
const volumeSlider = document.getElementById('volumeSlider');
const sign = document.getElementById('sign');
const names = document.getElementById('names');
const searchMyInput = document.getElementById('searchMyInput');

// Current Song & List
let index = 0;
let currentSongs = songs; 

// main cards content start from here 
function displaySongs(songs) {
container.innerHTML=songs.map((song,i)=>{    
    return `<div class="card rounded padd2" id="" onclick="playFromCard(${i})">
    <img loading="lazy" decoding="async" class="rounded img" src=${song.src} alt="">
    <img loading="lazy" class="playimg"src=${IMGSRC} alt="">
    <h2 class="bf">${song.Title}</h2>
    <h3 class="sbf">${song.Artist}</h3>
    <h3 class="sbf">${song.Artist2}</h3>
    <h3 class="sbf">${song.Artist3===undefined?"":song.Artist3}</h3>
    <h3 class="sbf">${song.Year}</h3>
</div>`
}).join("");
if (songs.length === 0) {
        container.innerHTML = ("<h2>No Songs Found!</h2>");
    }
}

function loadSong(i) {
    let src = currentSongs[i].songSrc;

    // Jaadui Trick: Agar Cloudinary link hai, toh yeh apne aap 'br_128k' laga dega
    if (src.includes("cloudinary.com") && src.includes("/upload/")) {
        src = src.replace("/upload/", "/upload/br_128k/");
    }

    audio.src = src;
    titleOne.innerText = currentSongs[i].Artist;
    titleTwo.innerText = currentSongs[i].Artist2;
    ArtistPic.src = currentSongs[i].src;    
}

function playFromCard(i) {
    index = i;
    loadSong(index);
    playAudio()
    showPopUp(currentSongs[index])   
}

// Play / Pause Button
playBtn.addEventListener("click", () => {
    audio.paused ? playAudio() : stopAudio();
    showPopUp(currentSongs[index])
});

nextBtn.addEventListener("click", () => {
    index++;
    if (index >= currentSongs.length) {
        index = 0;
    }
    playFromCard(index);
});

prevBtn.addEventListener("click", () => {
    index--;
    if (index < 0) {
        index = currentSongs.length - 1;
    }
    playFromCard(index);
});

audio.addEventListener("ended", () => {
    index++;
    if (index >= currentSongs.length) {
        index = 0;
    }
    playFromCard(index);
});

audio.volume = 1;

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
    sign.innerText = audio.volume === 0 ? "🔇" : "🔊";
});

sign.addEventListener("click", () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
        sign.innerText = "🔇";
    } else {
        audio.volume = 1;
        volumeSlider.value = 100;
        sign.innerText = "🔊";
    }
});

const uniqueArtists = [...new Set(songs.map(song => (song.Artist || "").trim()).filter(Boolean))].sort();

names.innerHTML = uniqueArtists.map((artist) => {
    return `<p class="mar cur" onclick="filterByArtist('${artist.replace(/'/g, "\\'")}')">${artist}</p>`;
}).join("");

function filterByArtist(artist) {
    currentSongs = songs.filter(song =>[song.Artist, song.Artist2, song.Artist3].some(name =>(name || "").toLowerCase().includes(artist.toLowerCase())));
    displaySongs(currentSongs);
    index = 0;
    if (currentSongs.length > 0) {
        loadSong(index);
    }
}

function showAllSongs() {
    currentSongs = songs;
    displaySongs(currentSongs);
    searchMyInput.value = "";
}

searchMyInput.addEventListener("input", () => {
    const text = searchMyInput.value.toLowerCase().trim();

    if (!text) {
        currentSongs = songs;
    } else {
        currentSongs = songs.filter(song =>
            song.Title.toLowerCase().includes(text) ||
            song.Artist.toLowerCase().includes(text) ||
            (song.Artist2 || "").toLowerCase().includes(text)
        );
    }
    displaySongs(currentSongs);
});

searchMyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && currentSongs.length > 0) {
        searchMyInput.value="";
        index=0;
    }
});
loadSong(index);
displaySongs(currentSongs);


