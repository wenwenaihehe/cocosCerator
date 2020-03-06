// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ctx = this.node.getComponent(cc.Graphics)
    },
    setBrushPos(x,y){
        this.ctx.moveTo(x,y);
    },
    setBrushLineWidth(lineWidth){
        this.ctx.lineWidth = lineWidth;
    },
    setBrushColor(color){
        //设置笔刷的颜色
        this.ctx.strokeColor =  color;
        this.ctx.fillColor = color;    
    },
    drawTo(x,y){
       this.ctx.lineTo(x,y);
       this.ctx.stroke();
      // this.ctx.moveTo(x,y);
    },
    // start () {

    // },

    // update (dt) {},
});
