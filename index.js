let sliderIndex = 0;
showSlides();
function showSlides() {
  let slides = document.querySelectorAll(".slide");
  let i;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  sliderIndex++;
  if (sliderIndex > slides.length) {
    sliderIndex = 1;
  }
  slides[sliderIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); //Changes elety 5 seconds
}

// the arrow slider
let rightbtn = document.querySelector(".slide-down");
let leftbtn = document.querySelector(".slide-up");

rightbtn.addEventListener("click", () => {
  let slides = document.querySelectorAll(".slide");
  sliderIndex += 1;
  let i;
  if (sliderIndex > slides.length) {
    sliderIndex = 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[sliderIndex - 1].style.display = "block";
});

leftbtn.addEventListener("click", () => {
  let slides = document.querySelectorAll(".slide");
  sliderIndex -= 1;
  let i;
  if (sliderIndex < slides.length) {
    sliderIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[sliderIndex - 1].style.display = "block";
});

// SIDE MENU
const sideLi = document.querySelectorAll(".side-li");

let LI = sideLi.forEach((e) => {
  e.addEventListener("click", () => {
    console.log("working");
  });
});

// FETCH
const inputSearch = document.querySelector(".input-search");
inputSearch.addEventListener(
  "keyup",
  (e) => {
    setTimeout(() => {
      // let filtered = document.querySelector(".filtered");
      const query = e.target.value.toLowerCase().trim();
      // if (query == " ") {
      //   filtered.style.display = "none";
      // } else {
      //   filtered.style.display = "block";
      // }
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
          "X-RapidAPI-Key":
            "d989b69243msh6b418d4b4750c81p175ad7jsn39554fe3d726",
        },
      };
      let musicAPI = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`;

      let music = JSON.parse(localStorage.getItem("musicAPI"));
      console.log(music);
      if (music == null) {
        fetch(musicAPI, options)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);

            let ress = localStorage.setItem("musicAPI", JSON.stringify(res));
          })

          .catch((err) => console.error(err));
      } else {
        let artistName = music.artists.items[0].data.profile.name;
        let artistImg =
          music.artists.items[0].data.visuals.avatarImage.sources[0].url;
        let artistImage =
          music.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url;
        let artistMain = music.playlists.items[0].data.name;
        let albumName = music.tracks.items[0].data.name;
        let releaseDate = music.albums.items[0].data.date.year;

        let artistHTML = `
              <div class="filtered-albums">
              <img src=${artistImage} class="filtered-image" />
              <div class="filtered-album-info">
                <h4>Song Title:${albumName}  </h4>
                <h4>Artist: <span style="font-weight: normal">${artistMain}</span> </h4>
                <p><b>Release Date:</b>  ${releaseDate} </p>

               </div>
            </div>
              `;
        filtered.innerHTML = artistHTML;
      }
    });
  },
  2000
);

// Top Artist

let artist = `
  <div class="artist-js-cont">

  </div>
`;
