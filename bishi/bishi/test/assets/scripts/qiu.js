// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,   
     //cc.node
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
        cc.log("jhhhh1111111111");
        this.colider  = this.node.getComponent(cc.RigidBody);
        this.txt      = this.node.getChildByName("NUMBER_TXT");
        cc.log(this.txt);
        this.Number = this.configNumer()
        this.txt.getComponent(cc.Label).string = this.getNumber();
        // this.colider.awakeOnLoad = false;
        
    },

    start () {
       // this.colider.awake = false;
    },
    configNumer:function(){
        var nub = Math.floor(Math.random()*10);
        return nub;
    },
    getNumber:function(){
        return Number(this.Number);
    }
    // update (dt) {},
});
