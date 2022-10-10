
// other themes to add ?
// bigger memory?

var library = {
Social: [
    'https://cdn3.iconfinder.com/data/icons/glypho-social-and-other-logos/64/logo-facebook-512.png',
    'https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-logo-abundant-instagram-logo-simple-icon-1.png',
    'https://image.similarpng.com/very-thumbnail/2020/06/Black-icon-Twitter-logo-transparent-PNG.png',
    'https://i.pinimg.com/originals/20/9b/d8/209bd859c265e7ffc4bfeb75877b23f7.png',
    'https://cdn-icons-png.flaticon.com/512/60/60818.png',
    'https://pnggrid.com/wp-content/uploads/2021/05/Black-Pinterest-Logo-Circle-1024x1024.png',
    'https://w7.pngwing.com/pngs/986/124/png-transparent-tiktok-social-media-logos-brands-icon-thumbnail.png',
    'https://e7.pngegg.com/pngimages/896/792/png-clipart-spotify-streaming-media-black-shout-spotify-logo-hand-logo-thumbnail.png',
    'https://www.citypng.com/public/uploads/preview/-11600705593z1cnhlumpc.png',
    'https://www.seekpng.com/png/detail/454-4544563_wechat-logo-vector-wechat-logo-vector-wechat-logo.png',
    'https://cdn3.iconfinder.com/data/icons/glypho-social-and-other-logos/64/logo-facebook-512.png',
    'https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-logo-abundant-instagram-logo-simple-icon-1.png',
    'https://image.similarpng.com/very-thumbnail/2020/06/Black-icon-Twitter-logo-transparent-PNG.png',
    'https://i.pinimg.com/originals/20/9b/d8/209bd859c265e7ffc4bfeb75877b23f7.png',
    'https://cdn-icons-png.flaticon.com/512/60/60818.png',
    'https://pnggrid.com/wp-content/uploads/2021/05/Black-Pinterest-Logo-Circle-1024x1024.png ',
    'https://w7.pngwing.com/pngs/986/124/png-transparent-tiktok-social-media-logos-brands-icon-thumbnail.png',
    'https://e7.pngegg.com/pngimages/896/792/png-clipart-spotify-streaming-media-black-shout-spotify-logo-hand-logo-thumbnail.png',
    'https://www.citypng.com/public/uploads/preview/-11600705593z1cnhlumpc.png',
    'https://www.seekpng.com/png/detail/454-4544563_wechat-logo-vector-wechat-logo-vector-wechat-logo.png'
  ]
}

var images = [];
var tempElt1 = "";
var tempElt2 = "";
var click = -1;
var win = 0;
var score = 0;
var time = 0;

var preElt = document.querySelector("#pre");
var themesElt = document.querySelector("#themes");
var boxElts = document.getElementsByClassName("box");
var mainElt = document.querySelector(".main");
var timeElt = document.querySelector("#time");
var scoreElt = document.querySelector("#score");
var postElt = document.querySelector("#post");
var finalElt = document.querySelector("#final");
var againElt = document.querySelector("#again");


// initiate the game with chosen theme
themesElt.addEventListener("click", function(e) {
  if (e.target.classList.contains("themes")) {
    activateTheme(e.target.id);
    preElt.classList.add("hidden");
  }
});


function activateTheme(theme) {
  // insert theme in images array
  for (let i = 0; i < 20; i++) {images.push(library[theme][i]);}  
  // insert images in memory game
  for (let i = 0; i < 20; i++) {
    var rand = Math.floor(Math.random() * (images.length - 1));
    boxElts[i].innerHTML = "<img src='" + images[rand] + "' alt='image' class='hidden'>";
    images.splice(rand, 1);
  }
}


// Handle the play
mainElt.addEventListener("click", gameLogic);

function gameLogic(e) {
  // make sure the box is playable
  if (e.target.classList.contains("play")) {
    e.target.firstChild.classList.remove("hidden");
    // first of two click
    if (click < 1) {
      tempElt1 = e.target;
      // timer
      if (click === -1) {
        timer = setInterval(function() {
          time++;
          timeElt.innerHTML = time;
        }, 1000);
      }
      click = 1;
    }

    // second click
    else if (e.target !== tempElt1) {
      tempElt2 = e.target;

      // different images
      if (tempElt1.firstChild.src !== tempElt2.firstChild.src) {
        mainElt.removeEventListener("click", gameLogic);
        setTimeout( function() {
          tempElt1.firstChild.classList.add("hidden");
          tempElt2.firstChild.classList.add("hidden");
          mainElt.addEventListener("click", gameLogic);
        }, 400);
        if (score > 0) {
          score -= 2;
        }
        scoreElt.innerHTML = score;
      }

      // same images
      else {
        score += 10;
        win += 2;
        tempElt1.firstChild.classList.add("outlined");
        tempElt2.firstChild.classList.add("outlined");
        tempElt1.classList.remove("play");
        tempElt2.classList.remove("play");
        scoreElt.innerHTML = score;

        // game won
        if (win === 20) {
          clearInterval(timer);
          finalElt.innerHTML = "You won " + score + " points <br> in " + time + " seconds";
          postElt.classList.remove("hidden");
        }
      }
      click = 0;
    }
  }
}

againElt.addEventListener("click", resetGame);

function resetGame() {
  // reset game
  tempElt1 = "";
  tempElt2 = "";
  click = -1;
  win = 0;
  score = 0;
  time = 0;
  postElt.classList.add("hidden");
  preElt.classList.remove("hidden");
  for (let i = 0; i < 20; i++) {
    boxElts[i].classList.add("play");
    boxElts[i].firstChild.classList.add("hidden");
  }
  timeElt.textContent = time;
  scoreElt.textContent = score;
}


