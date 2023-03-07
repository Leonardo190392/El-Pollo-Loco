class Endboss extends MovableObject {
  speed = 18.5;
  height = 400;
  width = 250;
  y = 50;
  energy = 30;
  EndbossMusic = new Audio("audio/endboss_sound.mp3");
  winSound = new Audio("audio/win_sound.mp3");

  offset = {
    top: 60,
    right: 20,
    bottom: 15,
    left: 20,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_RUN = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_RAGE = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_RAGE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_RUN);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3800;
    this.animate();
  }

  /**
   * animates chicken
   */
  animate() {
    setStoppableInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
    setStoppableInterval(() => this.playAnimationEnboss(), 150);
  }

  /**
   * checking the status of Endboss and plays the animation
   */
  playAnimationEnboss() {
    if (this.isDead() && this.y < 900) {
      this.endbossDying();
    } else if (this.y > 900) {
      this.showEndscreen();
      stopInterval();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_RAGE);
    } else if (this.energy < 30) {
      this.EndbossAnimate();
    }
  }

  /**
   * endboss move left and play endbossmusic
   */
  EndbossAnimate() {
    world.mainSound.pause();
    this.EndbossMusic.play();
    this.EndbossMusic.volume = 0.2;
    this.playAnimation(this.IMAGES_RUN);
    this.moveLeft();
  }

  /**
   * endboss dying animation
   */
  endbossDying() {
    this.playAnimation(this.IMAGES_DEAD);
    this.endbossFalling();
    this.EndbossMusic.pause();
    this.winSound.play();
  }

  /**
   * show the endscreen if you won
   */
  showEndscreen() {
    clearInterval(this.endbossFalling());
    world.showEndscreenText();
    this.winGame();
  }

  /**
   * Endboss falling down
   */
  endbossFalling() {
    setInterval(() => {
      this.y++;
    }, 15);
  }

  /**
   * add and remove obj for endscrren
   */
  winGame() {
    document.getElementById("gameWin").classList.remove("d-none");
    document.getElementById("gameRestart-btn").classList.remove("d-none");
    document.getElementById("canvas").classList.add("d-none");
    document.getElementById("ingameBtn").classList.add("d-none");
    document.getElementById("game-btns").classList.add("d-none");
  }
}
