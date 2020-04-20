// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
   
        posx : 0, //在地图中的坐标 0 ，0  （1,0）;
        posy : 0,
        pointx : 0,//这个是实际的position
        pointy : 0,
       
    },

    // LIFE-CYCLE CALLBACKS:
    statics: {
        // 声明静态变量
        jhhhhh:0,
    },
    onLoad () {
        cc.log('jhhhhhhhhhhhhhhh');
    },
    init:function()
    {
        var t =  this.jhhhhh;
        this.Type = {
            SnakeHead : 0,
            SnakeTail : 1,
        },
        this.SpriteComponet = this.node.getComponent(cc.Sprite);
    },
    addImageByIndex :function(index)
    {
        if (index == this.Type.SnakeHead) 
        {
            framework.UIManager.loadTexture('Texture/head.png',this.SpriteComponet,cc.SpriteFrame);
        }
        else if (index == this.Type.SnakeTail)
        {
            framework.UIManager.loadTexture('Texture/body.png',this.SpriteComponet,cc.SpriteFrame);
        }
    },
    setPosNew(x,y,Posx,Posy){
        this.node.setPosition(cc.v2(Posx,Posy));
        this.posx = x;
        this.posy = y;
        this.pointx = Posx;
        this.pointy = Posy;
    },
    getNowPointInfo(){
        var Info = {
            posx : this.posx,
            posy : this.posy,
            pointx : this.pointx,
            pointy : this.pointy,
        }
        return Info;
    },
    // start () {

    // },

    // update (dt) {},
});