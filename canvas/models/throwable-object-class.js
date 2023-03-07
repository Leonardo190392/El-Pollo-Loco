class ThrowableObject extends MovableObject {
  amount = 0;
  hitEndboss = false;
  broke = false;
  splash_sound = new Audio("audio/splash_bottle.mp3");
  speedX = 10;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage("img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.weight = 50;
    this.throw();
  }

  /**
   * throw obj
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.bottleRotation();
    this.brokeBottle();
  }

  /**
   * animtes the bottle rotation
   */
  bottleRotation() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        this.x += this.speedX;
      }
    }, 25);
  }

  /**
   * animates broke bottle
   */
  brokeBottle() {
    setInterval(() => {
      if (!this.isAboveGround() || this.hitEndboss) {
        this.playBreak();
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      }
    }, 100);
  }

  /**
   *  if for splash bottle oder eliminate bottle
   */
  playBreak(){
    if (this.broke) {
      this.eliminateBottle();
    } else {
      this.splashBottle();
    }
  }

  /**
   * animates splash Bottle
   */
  splashBottle() {
    this.splash_sound.play();
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.broke = true;
  }

  /**
   * remove bottle
   */
  eliminateBottle() {
    this.loadImage(
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    );
    this.width = 0;
    this.height = 0;
  }
}
