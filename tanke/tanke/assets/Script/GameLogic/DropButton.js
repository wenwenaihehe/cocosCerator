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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.Node
        this.position = this.node.getPosition(cc.Vec2);
        this.Speed = cc.v2(0,-1);
        
    },
    init:function(Speed,SpeedPoint,position,index){
        this.node.setPosition(position);
        this.Speed = Speed;
        this.SpeedPoint = SpeedPoint;
        if(index == 0)
        {
            framework.UIManager.loadTexture('border.png',this.node.getComponent(cc.Sprite),cc.SpriteFrame);
        }
        else
        {
            framework.UIManager.loadTexture('Write.png',this.node.getComponent(cc.Sprite),cc.SpriteFrame);
        }
        this.node.on('click',onClickButton,this);   
    },
    setSpeed:function(Speed){
        this.Speed = Speed;
    },
    updatePosition:function(){
        this.position.x = this.position.x + this.Speed.x;
        this.position.y = this.position.y + this.Speed.y;
        
        this.node.setPosition(cc.v2(this.position.x,this.position.y));
    },
    onClickButton:function(event){
11111111111111111111
    }
    start () {

    },

    // update (dt) {},
});
