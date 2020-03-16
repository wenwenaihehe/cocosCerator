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
        col:0,
        row:0,
        Padding:0,
        SpacingX:0,
        SpacingY:0,
        star:{
            default:null,
            type:cc.Prefab
        },
        Score:{
            default:null,
            type:cc.Node
        }
    },
  
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.reward = 0;
        this.pSet = null;
        this.stars = null;
        this.mask = null;

        this.buildstars();
        this.init();
        this.check();
    },
    buildstars:function(){
        var ele = cc.instantiate(this.star);
        var eleSize = ele.getContentSize();
        var beginX = (this.node.width - (this.row - 1) * (this.SpacingX + eleSize.width)) / 2;
        var beginY = this.Padding + eleSize.height/2;
        
        this.pSet = [];
        for (var i = 0 ; i < this.row ; i++)
        {
            var arr = [];
            for (var j = 0 ; j < this.col ; j++)

            {
                var position = cc.v2(beginX+i*(eleSize.width+this.SpacingX),beginY+j*(eleSize.height+this.SpacingY));
                cc.log(position.toString());
                arr.push(position);
            }
            this.pSet.push(arr);
        }
    },
    init:function(){
        var node = this.node.getChildByName('Layout');
        this.mask = [];
        this.stars = [];
        var pSet = this.pSet;
        for (var i = 0 ; i < this.row ; i++)
        {
            var arr1 = [];
            var marr = [];
            for (var j = 0 ; j< this.col; j++)
            {
                var alstar = cc.instantiate(this.star)
                alstar.setPosition(pSet[i][j].x,pSet[i][j].y);
                node.addChild(alstar,0,"ele");   
                this.addTouchEventLIstener(alstar);
                var com = alstar.getComponent('star');
                com.pos = cc.v2(i,j);
                arr1.push(alstar);
                marr.push(0);
            }
            this.mask.push(marr);
            this.stars.push(arr1);
        }
    },
    check:function(){

    },
     addTouchEventLIstener:function(node){
         var p1 = null;
         var p2 = null;
         node.on('touchstart',function(event){
            node.select = true;
            p1 = node.getComponent('star').pos;
         },this)
         node.on('touchmove',function(event){
             if(node.select)
             {
                 var x = event.getLocationX();
                 var y = event.getLocationY();
                 node.setPosition(x,y);
                 
                 node.setSiblingIndex(100);
             }
         },this);
         node.on('touchend',function(event){
             node.select = false;
            //  node.setPosition(this.pSet[p1.x][p1.y]);
             var x=event.getLocationX();
             var y=event.getLocationY();
             p2=this.PositionToPos(x,y);
             if(this.isAround(p1,p2) && typeof)
             node.setSiblingIndex(0);
         },this);
     },
     PositionToPos:function(x,y){//屏幕坐标转矩阵坐标
        var ele=cc.instantiate(this.star);
        var eleSize=ele.getContentSize();
        var pos=cc.v2(Math.floor((x-this.Padding)/(eleSize.width+this.SpacingX)),Math.floor((y-this.Padding)/(eleSize.height+this.SpacingY)));
        return pos;
    },
    // update (dt) {},
});
