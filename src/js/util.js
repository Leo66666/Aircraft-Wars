/*
 * @Date: 2019-12-12 16:08:39
 * @LastEditors: 廖晨希
 * @Author: 廖晨希
 * @LastEditTime: 2019-12-13 16:05:26
 */
// 工具类
class Util{
    //资源预加载
    loadResource(list,callback){
        let total=Object.keys(config.imgList).length;
        let count=0;
        let lists=[];
        for(let key in config.imgList){
            let item =config.imgList[key];
            let img=new Image();
            img.src=item;
            img.onload=()=>{
                config.imgList[key]=img;
                count++;
                if(count===total && callback){
                    callback();
                }
            }
        }
    }
    //返回边界最小值和最大值
    getHorizontalBoundary(enemies){
        let minX,maxX;
        enemies.forEach(enemy=>{
            if(minX==void 0){
                minX=enemy.x;
                maxX=enemy.x;
            }

            if(enemy.x<minX){
                minX=enemy.x;
            }
            if(enemy.x>maxX){
                maxX=enemy.x;
            }
        })
        return {
            minX,
            maxX
        }
    }
}