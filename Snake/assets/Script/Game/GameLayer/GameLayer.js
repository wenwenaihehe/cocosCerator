// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class(
    {
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
       
        this.mapType = {
            Null : 0,
            Jelly : 1,
            Snake : 2,
        };
        this.SnakeDireaction =
        {
            x : 0,
            y : 0,
        };
    },
    init:function(xIndex, yIndex){
        //初始化表格
        this.size = this.node._contentSize;
        this.xCount = Math.floor(this.size.width / xIndex);
        this.yCount = Math.floor(this.size.height / yIndex); 
        this.map = [];         //地图的坐标 
        this.mapFiller = [];  //当前地图是否填充
        this.SnakeList = []; //蛇的所有节点保存在这里面
        for (let i = 1 ; i <= this.xCount ; i++)
        {
            this.map[i] = [];
            this.mapFiller[i] = [];
            for(let j = 1 ; j <= this.yCount; j++)
            {
                this.map[i][j] = [];
                this.map[i][j].x = (i - 1) * xIndex + xIndex / 2;
                this.map[i][j].y = (j - 1) * yIndex + yIndex / 2;
                this.mapFiller[i][j] = this.mapType.Null;
            }
        }
    },
    startGame:function(StartPoint){
        this.SnakeDireaction.x = StartPoint == undefined ?  1 : StartPoint.x ;
        this.SnakeDireaction.y = StartPoint == undefined ?  0 : StartPoint.y ;
        var SnakePrefab = cc.instantiate(framework.UIManager.loadPrefab('Preb/Snake.prefab'));
        var t = SnakePrefab.getComponent('Snake');
        t.init();
        SnakePrefab.getComponent('Snake').addImageByIndex(0);
        this.SnakeList.push(SnakePrefab);
        this.node.addChild(SnakePrefab);

        SnakePrefab.setPosition(cc.v2(100,222));
        SnakePrefab.active = true;
    }  
    // start () {

    // },

    // update (dt) {},
});
