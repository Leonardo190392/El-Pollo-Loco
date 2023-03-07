class World {
  // in einer Klasse braucht man kein let, var oder const um eine Variable zu deklarieren
  character = new Character();
  level = level1; // damit kann auf alle Variablen aus dem level zugreifen
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  ThrowableObjects = [];
  bottleAmount = 0;
  coinsAmount = 0;
  killedChicken = 0;
  killedSmallChicken = 0;
  collectedCoin = 0;

  smallChicken = new SmallChicken();
  endBoss = level1.enemies[8];
  chicken = new Chicken();
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  coin = new Coins();
  bottle = new Bottle();

  dead_chicken = new Audio("audio/dead_chicken.mp3");
  collect_coin = new Audio("audio/collect_coin.mp3");
  collect_bottle = new Audio("audio/collect_bottle.mp3");
  mainSound = new Audio("audio/background.mp3");
  ouch = new Audio("audio/ouch.mp3");

  paused = false;
  throwAble = true;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.playMainSound();
  }

  /**
   * allow to use var's from world everywhere
   */
  setWorld() {
    this.character.world = this;
    this.chicken.world = this;
  }

  /**
   * checking all Collisions in a intervall
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollisionsChicken();
      this.checkCollisionsBottle();
      this.checkCollisionsCoins();
      this.checkCollisionsBottleWithEndboss();
      this.checkThrowObjects();
    }, 200);

    setInterval(() => {
      this.checkCollisionsChickenFromTopChicken();
      this.checkCollisionsChickenFromTopSmallChicken();
    }, 1000 / 60);
  }

  /**
   * show Endscreeen with kill stats
   */
  showEndscreenText() {
    document.getElementById("gameWin").innerHTML = /*html*/ `
        <div style="gap: 16px">
            <h2>You Won!</h2>
            <p>Endboss killed</p>
            <p>Small Chicken ${this.killedSmallChicken}/4 killed</p>
            <p>Chicken ${this.killedChicken}/4 killed</p>
            <p>Coins ${this.collectedCoin}/15 collected</p> 
        </div>    
            <button id="gameRestart-btn" class="restart-btn d-none" style="margin-right: 0px;" onclick="location.reload()">Restart Game</button>  
        `;
  }

  /**
   * plays backgroundsound
   */
  playMainSound() {
    this.mainSound.loop = true;
    this.mainSound.volume = 0.4;
    this.mainSound.play();
  }

  /**
   * checks if can throw bottles
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleAmount > 0 && this.throwAble) {
      setTimeout(() => {
        this.throwAble = true;
      }, 2000);
      this.addBottle();
    }
  }

  /**
   * check collision between character and normal chicken
   */
  checkCollisionsChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.dead) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * check collision from top on a normal chicken
   * instance is for counting which chicken is killed
   */
  checkCollisionsChickenFromTopChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.isCollidingFromAbove(enemy) && enemy instanceof Chicken) {
        enemy.hit();
        enemy.dead = true;    
        this.dead_chicken.play();
        this.killedChicken++;
      }
    });
  }

  /**
   * if an obj colliding from top
   * @param {string} mo 
   * @returns  if
   */
  isCollidingFromAbove(mo){
    return this.character.isColliding(mo) &&
    this.character.isAboveGround() &&
    !mo.dead &&

    !this.character.isHurt()
  }

  /**
   * check collision from top on a small chicken
   * instance is for counting which chicken is killed
   */
  checkCollisionsChickenFromTopSmallChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.isCollidingFromAbove(enemy) &&  enemy instanceof SmallChicken) { 
        enemy.hit();
        enemy.dead = true;
        this.dead_chicken.play();
        this.killedSmallChicken++;
      }
    });
  }

  /**
   * check collision between character and bottle
   */
  checkCollisionsBottle() {
    this.level.bottle.forEach((bottle) => {
      if (this.isCollidingObj(bottle)) {
        this.bottleAmount += 1;
        this.hideBottle(bottle);
        this.collect_bottle.play();
        this.bottleBar.setPercentage(this.bottleAmount * 20);
      }
    });
  }

  /**
   * 
   * @param {string} obj 
   * @returns check if obj is collectable
   */
  isCollidingObj(obj) {
    return this.character.isColliding(obj) &&
    obj.height != 0 &&
    obj.width != 0
  }

  /**
   * check collision between character and coin
   */
  checkCollisionsCoins() {
    this.level.coin.forEach((coin) => {
      if (this.isCollidingObj(coin)) {
        this.coinsAmount += 1;
        this.hideCoin(coin);
        this.collect_coin.play();
        this.coinBar.setPercentage(this.coinsAmount * 20);
        this.collectedCoin++;
      }
    });
  }

  /**
   * check collision between bottle and normal endboss
   */
  checkCollisionsBottleWithEndboss() {
    this.ThrowableObjects.forEach((ThrowableObjects) => {
      if (this.isCollidingEndboss(ThrowableObjects)) {
        this.ouch.play();
        this.endBoss.hit();
        ThrowableObjects.hitEndboss = true;
      }
    });
  }

  /**
   * 
   * @param {string} ThrowableObjects 
   * @returns check if bottle colliding with endboss
   */
  isCollidingEndboss(ThrowableObjects) {
    return this.endBoss.isColliding(ThrowableObjects) &&
    ThrowableObjects.heigth != 0 &&
    ThrowableObjects.width != 0
  }
  

  /**
   * add bottle to array
   */
  addBottle() {
    if (this.throwAble) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.checkBottleDirection(bottle);
      this.bottleAmount -= 1;
      this.bottleBar.setPercentage(this.bottleAmount * 20);
      this.ThrowableObjects.push(bottle);
      this.throwAble = false;
    }
  }

  /**
   * check collision between character and normal chicken
   * @Param {Object} bottle
   */
  checkBottleDirection(bottle) {
    if (this.character.otherDirection) {
      bottle.speedX *= -1;
      bottle.x = this.character.x;
    }
  }

  /**
   * remove bottle
   */
  hideBottle(bottle) {
    bottle.height = 0;
    bottle.width = 0;
  }

  /**
   * remove coin
   */
  hideCoin(coin) {
    coin.height = 0;
    coin.width = 0;
  }

  /**
   * draw obj to canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // löscht das canvas
    this.ctx.translate(this.camera_x, 0); // zum verschieben der Kamera, damit man nicht aus dem Bild laufen kann // man muss immer x und y achse angeben
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addBarsToMap();
    this.addCollectableObjToMap();
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.ThrowableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * add bars
   */
  addBarsToMap() {
    this.ctx.translate(-this.camera_x, 0); // back
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0); // forwards
  }

  /**
   * add collectable objects
   */
  addCollectableObjToMap() {
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.bottle);
    this.addObjectsToMap(this.level.enemies);
  }

  /**
   * add images from array to canvas
   * @param {array} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * add image of movable obj to canvas
   * @param {Movable Object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * mirrors movable obj
   * @param {Movable Object} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * mirrors images
   * @param {Movable Object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
