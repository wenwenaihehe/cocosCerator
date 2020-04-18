// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

framework = {};

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
        startNodeName : "start_btn",
    },

    // LIFE-CYCLE CALLBACKS:
    
   
    onLoad () {
       // this.startNodeName = "start_btn";
       framework.UIManager = require("./framework/UIManager");
       framework.UIManager.loadAll();
    },

    start () {
        var startGameNode = framework.UIManager.seekNodeByName(this.node,this.startNodeName);
        cc.log(typeof(startGameNode));
        startGameNode.on('click',this.startGame,this);
    },
    startGame:function(){
        cc.director.loadScene('Game');
    },

     update (dt) {},
});
