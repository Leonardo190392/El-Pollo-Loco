class SmallChicken extends MovableObject {
  y = 380;
  height = 40;
  width = 60;
  dead = false;
  energy = 5;

  offset = {
    top: 0,
    right: -20,
    bottom: 0,
    left: -20,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 400 + Math.random() * 3000;
    this.speed = 0.35 + Math.random() * 0.7;

    this.animate();
  }

  /**
  * animates chicken go left
  */
  animate() {
    this.move = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60); 

    this.walking = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.deadChicken();
      }
      else{
        this.playAnimation(this.IMAGES_WALKING);
      }     
    }, 200);
  }

  /**
   * dead chicken can not move anmyore
   */
  deadChicken() {
    setTimeout(() =>{
      clearInterval(this.move);
      clearInterval(this.walking);    
    },200)
  }  
}
