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

    // LIFE-CYCLE CALLBACKS
    onLoad () {
    },
    init:function(posx , posy , postionx , postiony){
        this.pos = {};
        this.Position = {};
        this.pos.x = posx;
        this.pos.y = posy;
        this.Position.x = postionx;
        this.Position.y = postiony;
        this.node.setPosition(cc.v2(postionx,postiony));
        this.SpriteNode = this.node.getComponent(cc.Sprite);
        framework.UIManager.loadTexture("Texture/apple.png",this.SpriteNode,cc.SpriteFrame);
        this.node.active = true;
        var a = 1;
      //  this.removefromparent();
    },      
    removefromparent:function(){
        this.node.removeFromParent();
    },
    start () {
        var t =1;
    },
    

    // update (dt) {},
});
