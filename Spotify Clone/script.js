async function getSong() {
  let songFiles = await fetch("http://127.0.0.1:5500/Spotify%20Clone/songs/");

  let response = await songFiles.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".m4a")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

function playMusic(track) {
  let audio = new Audio("/songs/" + track);
  audio.play();
}

async function main() {
  let songs = await getSong();

  const songsUL = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songsUL.innerHTML =
      songsUL.innerHTML +
      `<li>
      <div class="play-song">
      <i class="fa-solid fa-music"></i>
      <div class="info">
      ${song.replaceAll("%20", " ")}
      </div>
      <i class="fa-regular fa-circle-play"></i>
      </div>
      </li>`;
  }

  // let audio = new Audio(songs[0]);
  // audio.play();

  // audio.addEventListener("loadeddata", () => {
  //   console.log(audio.duration, audio.currentSrc, audio.currentTime);
  // });
}

Array.from(document.querySelector('.songsList').getElementsByTagName('li')).forEach(e => {
  e.addEventListener('click', element => {
    console.log(e.querySelector('.info').firstElementChild.innerHTML);
  
    playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim());
  })
})

main();