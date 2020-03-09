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
        this.YuList = this.node.getChildren();
        cc.log(this.YuList);
    },

    start () {

    },

    startMove:function(){
        //cc.log("!!!!!!!!!!!!!!!!!!!!!!!!!")
        for(var i = 0 ; i < this.YuList.length ; i++)
        {
            var x  = (Math.random()-0.5) * 750;
            var y  = (Math.random()-0.5) * 300;
            var time = Math.random() * 5;
            var CallBack = cc.callFunc(function (node)
                {
                   // cc.log("JJJJJJJJJJJJJ",node)
                    this.againAction(node);
                },this,null
            )
            cc.log(x,y);
            cc.log(cc.v2(x,y));
             this.YuList[i].runAction(
                 cc.sequence(
                     cc.moveTo(time,cc.v2(x,y)),
                     CallBack,
                 )
             );
        }
    },
    againAction:function(node)
    {
      //  cc.log("jhhhhhhhhhhhhhh");
        var x  = (Math.random()-0.5) * 750;
        var y  = (Math.random()-0.5) * 600;
        var time = Math.random() * 5;
        var CallBack = cc.callFunc(function (node)
        {
            this.againAction(node);
        },this,null       
        )
        node.runAction(
            cc.sequence(
                cc.moveTo(time,cc.v2(x,y)),
                CallBack,
            )
        );
    }
    // update (dt) {},
});
