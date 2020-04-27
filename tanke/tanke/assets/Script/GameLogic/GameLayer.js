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
        this.MaskNode = framework.UIManager.seekNodeByName(this.node,'MaskMain');
        this.ButtonNodeList = [];
    },

    start () {
      
        this.createButton();
        this.schedule(this.upDateSnakePos,0.2); 
   
    },
    createButton(x , y){
        x = x ? x : 0;
        y = y ? y : 0;
        for (let i = 0 ; i < 6 ; i++)
        {
            var ButtonNode = cc.instantiate(framework.UIManager.loadPrefab('prefab/DropButton.prefab'));
            var t = ButtonNode.getContentSize();
            //ButtonNode.setPosition(x,y + y * 70 *i);
            ButtonNode.getComponent('DropButton').init(cc.v2(0,-1),10,cc.v2(x,y+(t.height*i)),0);
            this.MaskNode.addChild(ButtonNode);
            this.ButtonNodeList.push(ButtonNode);
        }
    },
    upDateSnakePos:function(){
        for(let i = 0; i < this.ButtonNodeList.length; i++)
        {
            
        }
    },
    // update (dt) {},
});
