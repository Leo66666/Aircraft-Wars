/*
 * @Date: 2019-12-12 16:08:13
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-16 15:46:17
 * @Tips: keydown方法不能长按，而且不能一秒60帧，所以采用keydown keyup方法结合
 *        射击加入的防抖动 100ms里的连续点击都不生效
 */
class KeyBoard {
  constructor() {
    this.pressedLeft = false;
    this.pressedRight = false;
    this.pressedUp = false;
    this.pressedSpace = false;
    this.shoot = null;
    document.addEventListener("keydown", event => {
      this.keydown(event);
    });
    document.addEventListener("keyup", event => {
      this.keyup(event);
    });
  }
  keydown(event) {
    let key = event.keyCode;
    switch (key) {
      case 32:
        if (this.shoot) {
          clearTimeout(this.shoot);
        }
        this.shoot = setTimeout(() => {
          this.pressedSpace = true;
        }, 100);
        break;
      case 37:
        this.pressedLeft = true;
        this.pressedRight = false;
        break;
      case 38:
        if (this.shoot) {
          clearTimeout(this.shoot);
        }
        this.shoot = setTimeout(() => {
          this.pressedUp = true;
        }, 100);
        break;
      case 39:
        this.pressedLeft = false;
        this.pressedRight = true;
        break;
    }
  }
  keyup(event) {
    let key = event.keyCode;
    switch (key) {
      case 32:
        this.pressedSpace = false;
        break;
      case 37:
        this.pressedLeft = false;
        break;
      case 38:
        this.pressedUp = false;
        break;
      case 39:
        this.pressedRight = false;
        break;
    }
  }
}
