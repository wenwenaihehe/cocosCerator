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
        icons:{
            default:[],
            type:cc.SpriteFrame
        },
        pos:{
            default:new cc.Vec2
        },
        number:0,
        sfIndex:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initStar();
    },
    initStar:function(){
        function getRandomInt(min,max){
            var Ratio = Math.random();
            return min + Math.floor((max-min)*Ratio);
        }
        this.sfIndex = getRandomInt(0,this.number);
        var sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.icons[this.sfIndex];
    },
    start () {

    },

    // update (dt) {},
});
