/*
 * @Date: 2019-12-12 16:08:18
 * @LastEditors  : 廖晨希
 * @Author: 廖晨希
 * @LastEditTime : 2019-12-18 11:10:26
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

    // 初始化canvas
    let canvas = document.querySelector("#game");
    let canvasWidth = this.config.canvasWidth;
    let canvasHeight = this.config.canvasHeight;
    let ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    this.ctx = ctx;

    //提前加载游戏资源
    this.util.loadResource(config.imgList, () => {
      this.preload();
    });
  }
  //游戏准备
  preload() {
    this.setGameStatus("start");
    this.createEnemies();
    this.drawPlane(this.config.planeX);
    this.play();
  }
  //游戏开始
  play() {
    this.createCanvas();
    let ctx = this.ctx;

    this.timer = setTimeout(() => {
      this.play();
    }, 1000 / 60);
    
    //更新飞机位置
    this.updateEnemies(ctx);
    this.updateBullets(this.bullets);
    this.updatePlane(ctx);
  }
  //绘制我方飞机初始位置
  drawPlane(planeX) {
    let ctx = this.ctx;
    let planeY =
      this.config.canvasHeight -
      this.config.planeHeight -
      this.config.enemyPadding;
    this.plane = new Plane({
      x: planeX,
      y: planeY,
      width: this.config.planeWidth,
      height: this.config.planeHeight,
      img: this.config.imgList["plane"],
      ctx: ctx
    });
  }
  //更新敌方飞机
  updateEnemies(ctx) {
    let enemyMin = 0;
    let enemyMax = this.config.canvasWidth - this.config.enemyWidth;
    let horizontalBoundary = this.util.getHorizontalBoundary(this.enemies);

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

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      let item = this.enemies[i];
      item.translate(this.config.enemyDirection);
      //爆炸图片修改
      if (item.status == "booming") {
        if (item.boomCount < 4) {
          item.boomCount++;
        } else {
          this.enemies.splice(i, 1);
        }
      }
      item.down();
      item.draw(ctx);
      //碰撞检测
      if (item.crash(this.plane)) {
        this.setGameStatus("end");
        return;
      }
    }

    if (this.enemies.length == 0 && this.config.gameStaus == "start") {
      this.setGameStatus("next");
    }
  }
  //更新子弹
  updateBullets(bullets) {
    for (let i = bullets.length - 1; i >= 0; i--) {
      let item = bullets[i];
      if (item.y < 0) {
        bullets.splice(i, 1);
      } else {
        item.crash(this.enemies, this.bullets, i);
        item.move();
      }
    }
  }
  //更新飞机
  updatePlane(ctx) {
    let keyBoard = this.keyBoard;
    let plane = this.plane;
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
        ctx: this.ctx
      });
      bullet.draw();
      game.bullets.push(bullet);
      keyBoard.pressedSpace = false;
      keyBoard.pressedUp = false;
    }
    this.plane.draw(ctx);
  }
  //绘制敌方飞机
  createEnemies() {
    let enemeyY = 128 / 2.5;
    let padding = this.config.enemyPadding;
    let width = this.config.enemyWidth;

    // 根据当前gameLeve来显示
    for (let j = 1; j <= this.config.gameLevel; j++) {
      for (let i = 1; i <= this.config.enemyCount; i++) {
        this.enemies.push(
          new Enemy({
            x: padding + i * (width + padding),
            y: enemeyY * j,
            width: this.config.enemyWidth,
            height: this.config.enemyHeight,
            img: this.config.imgList["enemy"],
            ctx: this.ctx
          })
        );
      }
    }
  }
  //创建游戏画布
  createCanvas() {
    this.ctx.clearRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
    this.drawBackground();
    this.drawScore();
  }
  //绘制背景
  drawBackground() {
    let ctx = this.ctx;
    var color = ctx.createLinearGradient(0, 0, 0, 500);
    color.addColorStop(0, "#040025");
    color.addColorStop(1, "#05115c");
    ctx.fillStyle = color;
    ctx.fill();
  }
  //绘制分数
  drawScore() {
    let ctx = this.ctx;
    ctx.font = "18px Arial";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "white";
    ctx.fillText("分数: " + this.config.gameScore, 20, 40);
  }
  //设置游戏状态
  setGameStatus(status) {
    switch (status) {
      case "end":
        //游戏结束
        this.config.gameLevel = 1;
        document.querySelector(".container-end").style.display = "block";
        document.querySelector(
          ".container-end .preload-score span"
        ).innerHTML = this.config.gameScore;
        document.querySelector(
          ".container-end .preload-level span"
        ).innerHTML = this.config.gameLevel;
        document.querySelector("canvas").style.display = "none";
        break;
      case "next":
        //游戏结束
        this.config.gameLevel++;
        document.querySelector("canvas").style.display = "none";
        document.querySelector(".container-next").style.display = "block";
        document.querySelector(
          ".container-next .preload-level span"
        ).innerHTML = this.config.gameLevel;
        break;
    }
    clearTimeout(this.timer);
    this.enemies = [];
    this.bullets = [];
    this.timer = null;
    this.config.gameStaus = status;
  }
  //绑定事件
  bindEvent(e) {
    if (e.className.includes("start-btn")) {
      game.init(config);
      document.querySelector(".container-preload").style.display = "none";
      return;
    }

    if (e.className.includes("next-btn")) {
      document.querySelector(".container-next").style.display = "none";
    }

    if (e.className.includes("oneMore-btn")) {
      document.querySelector(".container-end").style.display = "none";
    }
    document.querySelector("canvas").style.display = "block";
    this.preload();
  }
}

let game = new Game();
