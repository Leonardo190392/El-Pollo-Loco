class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  constructor(x) {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = x;
    this.animate();
  }

  /**
   * animates clouds move left
   */
  animate() {
    setInterval(() => {
      // alle 1000ms wird diese funktion ausgeführt

      this.moveLeft();
    }, 1000 / 60); // ergibt 60 fps
  }
}
