/*
 * @Date: 2019-12-12 16:07:22
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-17 11:08:13
 */
let config = {
  //游戏画布宽度
  canvasWidth: 700,
  //游戏画布高度
  canvasHeight: 600,
  //我方飞机的宽度
  planeWidth: 124 / 2,
  //我方飞机的高度
  planeHeight: 203 / 2,
  //敌方飞机的宽度
  enemyWidth: 112 / 2.5,
  //敌方飞机的高度
  enemyHeight: 128 / 2.5,
  //敌方飞机的高度
  enemyCount: 7,
  //敌方飞机的间距
  enemyPadding: 13,
  //移动速度
  speed: 10,
  //游戏当前等级
  gameLevel: 1,
  //游戏当前分数
  gameScore: 0,
  //游戏当前状态
  gameStaus: "loading",
  //预加载资源
  imgList: {
    bg: "src/images/bg.png",
    bg_end: "src/images/bg-end.png",
    boom: "src/images/boom.png",
    enemy: "src/images/enemy.png",
    plane: "src/images/plane.png"
  },
  //飞机初始化X值
  planeX: (700 - 124 / 2) / 2,
  //敌机移动方向
  enemyDirection: "left",
  //是否需要向下
  is_down: false,
  //我方飞机移动的速度
  planeSpeed: 10
};
