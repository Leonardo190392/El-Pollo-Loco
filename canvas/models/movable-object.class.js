class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * add gravity to the game
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * check if obj is above the ground
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 350;
    } else {
      return this.y < 150;
    }
  }

  /* Character is colliding chicken
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x && 
            this.y < mo.y + mo.height;
    }
  */

  /**
   * checks if obj colliding
   * @param {Object} mo
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * hit object and reduce energy
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // so speichert man zeit in einem Zahlenwert
    }
  }

  /**
   * time between between last hit
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }

  /**
   * checking if obj is dead
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * paste images fromd array to cache
   * @param {Array} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }

  /**
   * move obj right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * move obj left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * obj jump
   */
  jump() {
    this.speedY = 30;
  }
}
