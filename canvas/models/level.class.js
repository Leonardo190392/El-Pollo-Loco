class Level {
  enemies;
  clouds;
  backgroundObjects;
  coin;
  bottle;
  level_end_x = 3500;

  constructor(enemies, clouds, backgroundObjects, coin, bottle) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coin = coin;
    this.bottle = bottle;
  }
}
