// Global Variables
let canvas;
let world;
let keyboard = new Keyboard();
let mute = false;

/**
 * Starts the game , add and remove Objects
 */
function startGame() {
  initLevel();
  setMobileBtn();
  HideObjects();
  init();
  setMobileBtn();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}


/**
 * Toggle between Fullscreen and no fullscreen
 */
function fullscreen() {
  let isInFullScreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  let docElm = document.getElementById("mainPage");
  if (!isInFullScreen) {
    openFullscreen(docElm);
  } else {
    closeFullscreen();
  }
}


/**
 * switch to the normal screen
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Open Fullscreen Mode
 * @param {string} docElm 
 */
function openFullscreen(docElm) {;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  }
}

function showControls() {
  document.getElementById("controls").classList.remove("d-none");
  document.getElementById("lightbox").classList.remove("d-none");
}

function closeControls() {
  document.getElementById("controls").classList.add("d-none");
  document.getElementById("lightbox").classList.add("d-none");
}

function showStory(){
    document.getElementById("story").classList.remove("d-none");
    document.getElementById("lightbox").classList.remove("d-none");
}

function closeStory(){
    document.getElementById("story").classList.add("d-none");
    document.getElementById("lightbox").classList.add("d-none");
}

/**
 * hides many Objects Buttons , img ....
 */
function HideObjects() {
  document.getElementById("gameStart").classList.add("d-none");
  document.getElementById("gamestart-btn").classList.add("d-none");
  document.getElementById("control-btn").classList.add("d-none");
  document.getElementById("story-btn").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("ingameBtn").classList.remove("d-none");
  document.getElementById("game-btns").classList.remove("d-none");
}

/**
 * mutes or play the background sound 
 */
function muteSound() {
  if (mute === false) {
    world.mainSound.pause();
    mute = true;
    document.getElementById("soundBtn").src = "img/mobile_btns/no_sound.png";
  } else {
    world.mainSound.play();
    document.getElementById("soundBtn").src = "img/mobile_btns/play_sound.png";
    mute = false;
  }
}

/* Settings for mobile keyboard*/
function setMobileBtn() {
  document.getElementById("canvas").addEventListener("touchstart", (e) => {
    e.preventDefault();
  });

  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btnJump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("btnJump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("btnThrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

/* Settiings for Normal keyboard*/

document.addEventListener("keydown", (e) => {
  // damit wird überprüft welche Taste gerade gedrückt wird
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }

  console.log(e);
});

document.addEventListener("keyup", (e) => {
  // damit wird überprüft welche Taste gerade losgelassen wird
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
