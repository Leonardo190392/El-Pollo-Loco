class CoinBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png", 
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 45;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Chooses image from image cache
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage; 
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  /**
   * reading percentage and returns a number
   */
  resolveImageIndex() {
    if (this.percentage === 300) {
      return 15;
    } else if (this.percentage > 280) {
      return 14;
    } else if (this.percentage > 260) {
      return 13;
    } else if (this.percentage > 240) {
      return 12;
    } else if (this.percentage > 220) {
      return 11;
    } else if (this.percentage > 200) {
      return 10;
    } else if (this.percentage > 180) {
      return 9;
    } else if (this.percentage > 160) {
      return 8;
    } else if (this.percentage > 140) {
      return 7;
    } else if (this.percentage > 120) {
      return 6;
    } else if (this.percentage > 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
