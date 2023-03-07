class DrawableObject {
  img;
  ImageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  offset = {
    top: 110,
    right: 20,
    bottom: 15,
    left: 20,
  };

  /**
   * set img-path
   * @param {String} path
   */
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementbyId('image) <img id="image"> it's the same meaning
    this.img.src = path;
  }

  /**
   * draw image on canvas
   * @param {String} ctx
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("Could not load image,", this.img.src);
    }
  }

  
  /*
   * @param {Array} arr - ['img/image1.png, 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = "transform: scaleX(-1)";
      this.ImageCache[path] = img;
    });
  }
}
