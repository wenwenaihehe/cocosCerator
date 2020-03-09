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
        fishLayout: {
            default: null,
            type:cc.Node,
        },
        collider: cc.Prefab,
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
        cc.director.getPhysicsManager().enabled = true ;//开启物理引擎
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;     //开启碰撞检测
        manager.enabledDebugDraw = true; // 开启碰撞绘制
        cc.director.getPhysicsManager().gravity = cc.v2(0,-320);
        this.numberList = [];


        this.NumberOneer = null;
        this.NUmberTwoer = null;
        this.NowClick    = 1;

        this.RedBackOneNode = this.node.getChildByName("Red_1");
        this.RedBackTwoNode = this.node.getChildByName("Red_2");

    },

    start () {
        var ts = this.fishLayout.getComponent("yu");
        cc.log(ts);
        ts.startMove();
       // window.events.on("input",this.gameinput)
        //window.events.on("config",this.gameconfig)
        this.gamestart();
    },
    gamestart:function(){
        var data = 
        {
            duration: 800 // 用于设置input发送频率，单位毫秒，默认800
        };
        for (var i = 0 ; i < 10 ; i++)
         {
             var newStar = cc.instantiate(this.collider);
            // 将新增的节点添加到 Canvas 节点下面
            this.node.addChild(newStar);
            // 为星星设置一个随机位置
            newStar.setPosition(this.getNewStarPosition());
            this.numberList[i] = newStar;
            //Math.random() 
         }
        this.addEventListenr()
    
    },
    addEventListenr:function()
    {
        this.BtnFatherNode = this.node.getChildByName("btnNumber");
        cc.log("BtnFatherNode",this.BtnFatherNode);
        this.BtnList = this.BtnFatherNode.getChildren();
        cc.log("BtnList",this.BtnList);
        for (var i = 0 ; i < this.BtnList.length ; i++)
        {   cc.log("jhhhhhhhhhhh",this.BtnList[i].name);
            this.BtnList[i].on('click', this.onClickBtnEvent, this);
        }
    },
    onClickBtnEvent:function(sender)
    {
        var  node = sender.target;
       // cc.Node
        //var button = node.getComponent(cc.Button);
        cc.log("jhhhhhhhhhhh",node._name);
        //var Number = String.match("BTN_(%d+)",sender.name);
        var re = /BTN_(\d+)/;
        var Number123  = node._name.match(re)
        cc.log("jhhhhhhhhhhhNumber",Number123);
        cc.log("jhhhhhhhhhhhNumber",Number123[1]);

        var ClickNumber = Number123[1];
        if (this.NowClick == 1)
        {
            this.NumberOneer = ClickNumber;
            this.NowClick += 1;
            this.dealShowRedBack(1);
            cc.log("jhhhhhhhh 1");
        }
        else
        {
            cc.log("jhhhhhhhh 2");
            this.NUmberTwoer = ClickNumber;
            this.NowClick = 1;
            this.dealShowRedBack(2);
            this.middleEnd();
        }
        
    },
    dealShowRedBack:function(cnt){
        if (cnt == 1) 
        {
            this.RedBackOneNode.getChildByName('Txt').getComponent(cc.Label).string = this.NumberOneer
        }
        else
        {
            this.RedBackTwoNode.getChildByName('Txt').getComponent(cc.Label).string = this.NUmberTwoer
        }
    },
    middleEnd:function(){
        if(this.NumberOneer == null || this.NUmberTwoer == null)
        {
            cc.log("jhhhhhhhh error");
            this.NowClick = 1;
            return;
        }
        this.NowClick = 1;
     
        var Soul = Number(this.NumberOneer) + Number(this.NUmberTwoer);
        this.NumberOneer = "";
        this.NUmberTwoer = "";
        this.dealShowRedBack(1);
        this.dealShowRedBack(2);
        cc.log("numberList",this.numberList.length);
        for(var i = 0 ; i < this.numberList.length ; i++)
        {
            cc.log("this.numberlis",this.numberList[i]);

            if (this.numberList[i] != 1)
            {
                cc.log('jhhhhhhhhhh',this.numberList[i].getComponent("qiu").getNumber());
                cc.log('jhhh',Soul);
                if (this.numberList[i].getComponent("qiu").getNumber() == Number(Soul))
                {
                    this.numberList[i].destroy();
                    this.numberList[i] = 1;
                }
                    
            }
        }
    },
    gameinput:function(){

    },
    gameconfig:function(){

    },
    getNewStarPosition:function(){
        var x = (Math.random()-0.5) *600
        var y = (Math.random()) *100 + 600
        return cc.v2(x,y) 
    }
    // update (dt) {},
});
