/*
 * @Date: 2019-12-12 16:08:07
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-17 10:47:17
 * @methods:shot射出子弹 draw绘制子弹  move子弹的更新移动
 */

class Bullet {
  constructor({ x, y, bulletWidth, bulletHeight, ctx }) {
    this.x = x;
    this.y = y;
    this.width = bulletWidth;
    this.height = bulletHeight;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, 2, 10);
  }
  move() {
    this.y -= 5;
    this.draw();
  }
  //子弹碰撞检测
  crash(enemies, bullets, index) {
    let bullet = bullets[index];
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];
      let xMin = enemy.x;
      let xMax = enemy.x + enemy.width;
      let yMin = enemy.y;
      let yMax = enemy.y + enemy.height;

      if (
        bullet.x >= xMin &&
        bullet.x <= xMax &&
        bullet.y >= yMin && bullet.y <= yMax
      ) {
        //已经碰撞了 删除子弹和飞机
        // enemies.splice(i,1)
        enemy.boom(i)
        bullets.splice(index,1)
        game.config.gameScore++;
      }
    }
  }
}
