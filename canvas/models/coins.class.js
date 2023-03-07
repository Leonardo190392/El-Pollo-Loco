class Coins extends MovableObject {
  height = 120;
  width = 120;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * 2800;
    this.y = 100 + Math.random() * 200;
  }
}
