// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
window.framework = {};
framework.UIManager = require('./framework/UIManager');
framework.EventListenerTarget = require('./framework/EventListenerTarget');
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
        this.position = this.node.getPosition();
        let SpeedPoint = cc.v2(0,-1);
        cc.log(SpeedPoint.x);
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        //cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        cc.view.resizeWithBrowserSize(true);
        this.button = framework.UIManager.seekNodeByName(this.node,'button');
        if (this.button) 
        {
            this.button.on('click',this.GoGameScene,this);
        }
        framework.EventListenerTarget.addEventListener('fffff',function(event){
            var a = this;
            var t = event.detail;
            cc.log(111);
        },this);
    },

    GoGameScene:function(){ 
        cc.director.loadScene('GameScene');
    },
    start () {
        //cc.director.loadScene('LobbyScene');
        var evetnt = {
            a :1,
            b :2,
        }
        framework.EventListenerTarget.EmitEvent('fffff','11111');
        var Node = cc.instantiate(framework.UIManager.loadPrefab('prefab/DropButton.prefab'));
        var nodeb = Node.getComponent('DropButton');
        nodeb.init(0,0,cc.v2(300,300),0);
        this.node.addChild(Node);
    },

    // update (dt) {},
});
