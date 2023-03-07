class Bottle extends MovableObject {
  height = 100;
  width = 80;
  y = 330;
  splash = false;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 2300;
  }
}
