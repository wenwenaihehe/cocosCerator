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
        this.Speed = 1; //默认贪吃蛇的速度是1倍速
    },
    init:function(xIndex, yIndex){
        //初始化表格
        this.size = this.node._contentSize;
        this.xCount = Math.floor(this.size.width / xIndex);
        this.yCount = Math.floor(this.size.height / yIndex); 
        this.map = [];         //地图的坐标 
        this.mapFiller = [];  //当前地图是否填充
        this.SnakeList = []; //蛇的所有节点保存在这里面
        this.JellyList = [];
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
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown:function(EventType)
    {
        switch(EventType.keyCode) {
            case cc.KEY.up:
                this.SnakeDireaction.x = 0;
                this.SnakeDireaction.y = 1;
                break;
            case cc.KEY.down:
                this.SnakeDireaction.x = 0;
                this.SnakeDireaction.y = -1;
                break;
            case cc.KEY.left:
                this.SnakeDireaction.x = -1;
                this.SnakeDireaction.y = 0;
                break;
            case cc.KEY.right:
                this.SnakeDireaction.x = 1;
                this.SnakeDireaction.y = 0;
                break;
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
        let pointx = Math.floor((this.xCount + 1)/2);
        let pointy = Math.floor((this.yCount + 1)/2);
        SnakePrefab.getComponent('Snake').setPosNew(pointx,pointy,this.map[pointx][pointy].x,this.map[pointx][pointy].y);
        SnakePrefab.active = true;
        this.updateMapFiler();
        this.schedule(this.upDateSnakePos,0.2);
        
    },
    upDateSnakePos:function(dt){
        cc.log(dt);
        for (let i = this.SnakeList.length -1 ; i >= 0; i--)
        {
            if (i == 0)
            {
                let info = this.SnakeList[i].getComponent('Snake').getNowPointInfo()
                info = this.getNextPosInfo(info)
                if (this.checkPos(info))
                    {
                        this.SnakeList[i].getComponent('Snake').setPosNew(info.posx,info.posy,info.pointx,info.pointy);
                       // this.updateMapFiler();
                    }
                else
                    this.GameEnd();
            }
            else
            {   
                let PreViousData = this.SnakeList[i-1].getComponent('Snake');
                this.SnakeList[i].getComponent('Snake').setPosNew(PreViousData.posx,PreViousData.posy,PreViousData.pointx,PreViousData.pointy);
            }
        }
    },
    getNextPosInfo:function(info){
        info.posx = (info.posx + (this.SnakeDireaction.x * this.Speed)) % (this.xCount + 1);
        info.posy = (info.posy + (this.SnakeDireaction.y * this.Speed)) % (this.yCount + 1);
        if(info.posx == 0) 
        {
            info.posx = 1;
        }
        if(info.posy == 0)
        {
            info.posy = 1;
        }
        info.pointx = this.map[info.posx][info.posy].x;
        info.pointy = this.map[info.posx][info.posy].y;
        return info;
    },    
    checkPos:function(info){
        if(this.mapFiller[info.posx][info.posy] == this.mapType.Null)
            return true;
        else if (this.mapFiller[info.posx][info.posy] == this.mapType.Snake)
            return false;
        else if (this.mapFiller[info.posx][info.posy] == this.mapType.Jelly)
        {   
            this.destroyJelly(info);
            this.updateMapFiler();
            this.SnakeBecomeLong();
            return true;
        }
    },
    updateMapFiler:function(){
        var CanChoosePostion = [];
        for (let i = 1 ; i <= this.xCount ; i++)
        {
            for(let j = 1 ; j <= this.yCount; j++)
            {
                if ( this.mapFiller[i][j] == this.mapType.Null)
                {
                    let mids = {
                        x : i,
                        y : j,
                    };
                    CanChoosePostion.push(mids);
                }
            }
        }
        var randomEnd = Math.floor(Math.random() * (CanChoosePostion.length));
        var endPos = CanChoosePostion[randomEnd];
        var jellyNode = cc.instantiate(framework.UIManager.loadPrefab('Preb/apple.prefab'));
        jellyNode.addComponent('jelly');
        jellyNode.getComponent('jelly').init(endPos.x,endPos.y,this.map[endPos.x][endPos.y].x,this.map[endPos.x][endPos.y].y);
        this.node.addChild(jellyNode);
        this.JellyList.push(jellyNode);
        this.mapFiller[endPos.x][endPos.y] = this.mapType.Jelly;

    },
    destroyJelly:function(info){
        for (let i = 0 ; i < this.JellyList.length;  i++)
        {   
            let t = this.JellyList[i].getComponent('jelly');
            if(this.JellyList[i].getComponent('jelly').pos.x == info.posx && this.JellyList[i].getComponent('jelly').pos.y == info.posy)
            {
                this.JellyList[i].getComponent('jelly').removefromparent();
                this.JellyList.splice(i,1);
                //this.updateMapFiler();
                this.mapFiller[info.posx][info.posy] = this.mapType.Null;
                break;
            }
        }
    },
    SnakeBecomeLong:function(){
        var SnakePrefab = cc.instantiate(framework.UIManager.loadPrefab('Preb/Snake.prefab'));
        var t = SnakePrefab.getComponent('Snake');
        t.init();
        SnakePrefab.getComponent('Snake').addImageByIndex(1);
       
       

        let pointx = this.SnakeList[this.SnakeList.length - 1].getComponent('Snake').posx;
        let pointy = this.SnakeList[this.SnakeList.length - 1].getComponent('Snake').posy;

        SnakePrefab.getComponent('Snake').setPosNew(pointx,pointy,this.map[pointx][pointy].x,this.map[pointx][pointy].y);
        SnakePrefab.active = true;
        this.SnakeList.push(SnakePrefab);
        this.node.addChild(SnakePrefab);
    },
    StateMachine:function(State){
        
    },
    // start () {

    // },

    //  update (dt) {
    //  },
});
