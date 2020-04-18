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

    onLoad () {
        
    },
    init:function()
    {
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
    // start () {

    // },

    // update (dt) {},
});