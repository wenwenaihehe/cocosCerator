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
        this.cnt = 1;
    },

    start () {
        this.AniMation = this.node.getComponent(cc.Animation);
        this.AniMation.on('stop', this.loadStoryScene, this);
        
        var animState = this.AniMation.getAnimationState('logo');
        animState.repeatCount = 2.5;

        // if(this.animState){
        //     this.animState.on('stop',this.loadStoryScene,this);
        // }
        this.startRunRe();
    },
    startRunRe:function(){
        this.AniMation.play('logo',0);
    },
    loadStoryScene:function(){
        if (this.cnt == 3)
        {
            cc.director.loadScene("Story");
        }
        this.cnt += 1;
        this.startRunRe();
    }

    // update (dt) {},
});
