/*
 * @Date: 2019-12-12 16:07:38
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-17 11:47:32
 */

class Element{
    constructor({ x, y, width, height, img, ctx }){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.ctx = ctx;
    }
    draw(ctx=game.ctx){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
    move(x,y){
        this.x+=x;
        if(y){
            this.y+=y;
        }
    }
}