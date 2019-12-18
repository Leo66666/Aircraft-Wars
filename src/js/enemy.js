/*
 * @Date: 2019-12-12 16:07:44
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-17 17:54:56
 */

class Enemy extends Element {
  constructor({ x, y, width, height, img, ctx }) {
    super({ x, y, width, height, img, ctx });
    this.boomCount=0;
    this.status='normal'
  }
  //水平方向
  translate(direction) {
    if (direction === "left") {
      this.move(-config.speed / 5, 0);
    } else {
      this.move(config.speed / 5, 0);
    }
    return this;
  }
  // 下降
  down() {
    if(config.is_down){
      this.move(0, config.enemyWidth);
    }
  }
  // 碰撞检测
  crash(plane){
    if(this.y>=plane.y-config.enemyHeight){
      return true;
    }
    return false;
  }
  //爆炸
  boom(){
    this.img=config.imgList['boom'];
    this.status='booming';
  }
}
