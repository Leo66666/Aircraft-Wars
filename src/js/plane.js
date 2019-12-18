/*
 * @Date: 2019-12-12 16:07:44
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-17 11:57:34
 */

class Plane extends Element {
  constructor({ x, y, width, height, img, ctx }) {
    super({ x, y, width, height, img, ctx });
  }
  //射击
  shot(bullet){
    bullet.draw(this.x,this.y);
  }
  //水平方向
  move(x) {
    if ((this.x + x) <= 0) {
      //超出左边框
      return;
    }
    if ((this.x + x) >= config.canvasWidth - config.planeWidth) {
      return;
    }
    super.move(x)
  }
}
