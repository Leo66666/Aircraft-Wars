/*
 * @Date: 2019-12-12 16:08:18
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-16 16:17:58
 */

class Game {
  //游戏初始化
  init(config) {
    this.config = Object.assign({}, config);
    this.util = new Util();
    this.keyBoard = new KeyBoard();
    this.enemies = [];
    this.bullets = [];
    this.timer = null;

    //提前加载游戏资源
    this.util.loadResource(config.imgList, () => {
      this.setGameStaus("start");
      this.createEnemies();
      this.drawPlane(this.config.planeX);
      this.play();
    });
  }
  preload() {
    this.setGameStaus("start");
    this.createEnemies();
    this.drawPlane(this.config.planeX);
    this.play();
  }
  //游戏开始
  play() {
    this.createCanvas();
    let ctx = this.canvas;

    this.timer = setTimeout(() => {
      this.play();
    }, 1000 / 60);

    //绘制敌方的飞机初始位置
    this.updateEnemiess(ctx);
    this.updateBullets(this.bullets);
    this.plane.draw(ctx);
    this.updatePlane();
  }
  //绘制我方飞机初始位置
  drawPlane() {
    let planeX = config.planeX;
    let ctx = this.ctx;
    let planeY =
      this.config.canvasHeight -
      this.config.planeHeight -
      this.config.enemyPadding;
    this.plane = new Plane({
      x: planeX,
      y: planeY,
      planeWidth: this.config.planeWidth,
      planeHeight: this.config.planeHeight,
      img: this.config.imgList["plane"],
      ctx: ctx,
      bullet: this.bullet
    });
  }
  //更新敌方飞机
  updateEnemiess(ctx) {
    let enemyMin = 0;
    let enemyMax = this.config.canvasWidth - this.config.enemyWidth;
    let horizontalBoundary = this.util.getHorizontalBoundary(this.enemies);

    if (this.enemies.length == 0) {
      this.setGameStaus("next");
    }

    // 检测飞机的移动方向
    if (horizontalBoundary.minX <= enemyMin) {
      this.config.enemyDirection = "right";
      config.is_down = true;
    } else if (horizontalBoundary.maxX >= enemyMax) {
      this.config.enemyDirection = "left";
      config.is_down = true;
    } else {
      config.is_down = false;
    }

    for (let i = 0; i <= this.enemies.length - 1; i++) {
      let item = this.enemies[i];
      item.translate(this.config.enemyDirection);
      item.down();
      item.draw(ctx);
      //碰撞检测
      if (item.crash(this.plane) && !this.config.crash_show) {
        this.setGameStaus("end");
        this.config.crash_show = true;
      }
    }
  }
  //更新子弹
  updateBullets(bullets) {
    for (let i = bullets.length - 1; i >= 0; i--) {
      let item = bullets[i];
      if (item.y < 0) {
        bullets.splice(i, 1);
      }
      item.crash(this.enemies, this.bullets, i);
      item.move();
    }
  }
  //更新飞机
  updatePlane() {
    let keyBoard = this.keyBoard;
    let plane=this.plane;
    if (keyBoard.pressedLeft) {
      plane.move(-this.config.planeSpeed / 3);
    }
    if (keyBoard.pressedRight) {
      plane.move(this.config.planeSpeed / 3);
    }
    if (keyBoard.pressedUp || keyBoard.pressedSpace) {
      let bullet = new Bullet({
        x: plane.x + config.planeWidth / 2 - 1,
        y: plane.y,
        bulletWidth: 2,
        bulletHeight: 10,
        ctx: game.canvas
      });
      bullet.draw();
      game.bullets.push(bullet);
      keyBoard.pressedSpace = false;
      keyBoard.pressedUp = false;
    }
  }
  //绘制敌方飞机
  createEnemies() {
    let enemeyY = config.enemyY;
    let padding = this.config.enemyPadding;
    let width = this.config.enemyWidth;

    // 根据当前gameLeve来显示
    for (let j = 1; j <= this.config.gameLevel; j++) {
      for (let i = 1; i <= this.config.enemyCount; i++) {
        this.enemies.push(
          new Enemy({
            x: padding + i * (width + padding),
            y: enemeyY * j,
            enemyWidth: this.config.enemyWidth,
            enemyHeight: this.config.enemyHeight,
            img: this.config.imgList["enemy"],
            ctx: this.ctx
          })
        );
      }
    }
  }
  //创建游戏画布
  createCanvas() {
    let canvas = document.querySelector("#game");
    let ctx = canvas.getContext("2d");
    canvas.width = this.config.canvasWidth;
    canvas.height = this.config.canvasHeight;
    ctx.clearRect(
      0,
      0,
      this,
      this.config.canvasWidth,
      this.config.canvasHeight
    );
    this.canvas = ctx;
    this.drawBackground();
    this.drawScore();
  }
  //绘制背景
  drawBackground() {
    let ctx = this.canvas;
    ctx.rect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
    var color = ctx.createLinearGradient(0, 0, 0, 500);
    color.addColorStop(0, "#040025");
    color.addColorStop(1, "#05115c");
    ctx.fillStyle = color;
    ctx.fill();
  }
  //绘制分数
  drawScore() {
    let ctx = this.canvas;
    ctx.font = "18px Arial";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "white";
    ctx.fillText("分数: " + this.config.gameScore, 20, 40);
  }
  //设置游戏状态
  setGameStaus(status) {
    switch (status) {
      case "end":
        //游戏结束
        clearTimeout(this.timer);
        alert("游戏结束");
        break;
      case "next":
        //游戏结束
        clearTimeout(this.timer);
        setTimeout(() => {
          this.config.gameLevel++;
          this.preload();
        }, 2000);
        break;

      default:
        break;
    }
    this.enemies = [];
    this.bullets = [];
    this.timer = null;
    this.config.gameStaus = status;
  }
}

let game = new Game();
game.init(config);
