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

       
    },
    start(){
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
               // cc.log(position.toString());
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
    // check:function(){

    // },
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
                // cc.log(x,y)
             }
         },this);
         node.on('touchend',function(event){
             node.select = false;
            //  node.setPosition(this.pSet[p1.x][p1.y]);
             var x=event.getLocationX();
             var y=event.getLocationY();
             p2=this.PositionToPos(x,y);
             if(this.isAround(p1,p2) && typeof(this.stars[p2.x][p2.y])!='undefined')
             {
                 this.changeTwoPos(p1,p2);
                 this.check();//check
             }else{
                node.setPosition(this.pSet[p1.x][p1.y]);
             }
             node.setSiblingIndex(0);
         },this);
     },
     PositionToPos:function(x,y){//屏幕坐标转矩阵坐标
        var ele=cc.instantiate(this.star);
        var eleSize=ele.getContentSize();
        var pos=cc.v2(Math.floor((x-this.Padding)/(eleSize.width+this.SpacingX)),Math.floor((y-this.Padding)/(eleSize.height+this.SpacingY)));
        return pos;
    },
    isAround:function(p1,p2){
        var t = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
        if (t == 1)
        {
            return true;
        }
        return false;
    },
    check:function(){
        if(this.checkConnected()){
            this.delAndDrop();
        }
    },
    checkConnected:function(){
        var count1 = this.widthCheckConnected();
        var count2 = this.heightCheckConnected();
        
        this.reward = count1 + count2;
        //this.updateScore();
        return ((count1+count2)>0)?true:false;
    },
    widthCheckConnected:function(){
        var index1 , index2 ; //储存两个stars的颜色
        var start , end;
        var count = 0;
        for (var i = 0; i < this.stars.length;i++)
        {
            if (typeof(this.stars[i][0])=='undefined'){
                continue;
            }
            //寻找从第一个开始
            index1 = this.stars[i][0].getComponent('star').sfIndex;
           // cc.log(index1);
           start = 0;
            for (var j = 0 ; j < this.stars[i].length;j++)
            {
                if(j == this.stars[i].length)
                {
                    index2 = -1;
                }
                else
                {
                    index2 = this.stars[i][j].getComponent('star').sfIndex;
                }
                if (index1 != index2){
                    end = j;
                    if (end - start >=3){
                        while(start != end){
                            this.mask[i][start] = 1;
                            start++;
                            count++;
                            cc.log('jhhhhhhhhhhhh');
                        }
                    }
                    start = end;
                    if(start != this.stars[i].length)
                    {
                        index1 = index2;
                    }
                }
            }
            if (index1 == index2){
                end = this.stars[i].length;
                if (end - start >=3){
                    while(start != end){
                        this.mask[i][start] = 1;
                        start++;
                        count++;
                        cc.log('jhhhhhhhhhhhh');
                    }
                }
                start = end;
                if(start != this.stars[i].length)
                {
                    index1 = index2;
                }
            }
        }
        return count;
    },
    heightCheckConnected:function()
    {
        var index1 , index2;
        var begin ,end;
        var count = 0;
        for(var j = 0 ; j < this.col;j++)
        {
            for(i = 0 ; i < this.row;){
                if(typeof(this.stars[i][j])=='undefined'){
                    i++;
                    continue;
                }
                index1 = this.stars[i][j].getComponent('star').sfIndex;
                begin = i;
                end = begin;
                while(end < this.row)
                {
                    if(typeof(this.stars[end][j]) == 'undefined'){
                        if(end - begin >=3){
                            while(begin != end){
                                if(this.mask[begin][j] != -1){
                                    this.mask[begin][j] = 1;
                                    count++;
                                }
                                begin++;
                            }
                        }
                        break;
                    }
                    index2 = this.stars[end][j].getComponent('star').sfIndex;
                    cc.log(index1,index2)
                    if(index1 != index2)
                    {
                        if(end - begin >=3){
                            while(begin  != end){
                                if(this.mask[begin][j] != 1){
                                    this.mask[begin][j] = 1;
                                    count++;
                                    cc.log(count);
                                }
                                begin++;
                            }
                            cc.log('jhhhhhhhhhh');
                        }
                        break;
                    }
                    end++;
                }
                //枚举到尾部要判断一次
                if(end == this.row && end - begin >= 3){
                    while(begin!=end){
                        if(this.mask[begin][j] != 1){
                            this.mask[begin][j] = 1;
                            count++;
                        }
                        begin++;
                    }
                }
                i = end;
            }
        }
        return count;
    },
    delAndDrop:function(){
        
        this.deleteConnected();
        this.dropAndUpdata();

    },
    deleteConnected:function(){
        for(var i = 0 ; i < this.row;i++){
            var count = 0;
            var start = 0,end;
            var onoff = true;
            for(var j = this.col -1 ; j>=0;j--)
            {
                if(this.mask[i][j] == 1)
                {
                    if(onoff){
                        start = j;
                        onoff =false;
                    }
                    var act = cc.sequence(cc.blink(0.2,1),cc.scaleBy(0.5,0,0));
                    this.stars[i][j].runAction(act);
                }
                if(( this.mask[i][j-1] != 1 || j-1< 0) && onoff ==false ){
                    end = j;
                    this.stars[i].splice(end,start-end+1);
                    onoff =true;
                }
                this.mask[i][j] = 0;
            }
        }
        this.updateScore();
    },
    updateScore:function(){
        var score=this.Score.getComponent('Score');//更新分数显示
        cc.log('jhhhhhhhhhhhhhhh',this.reward)
        score.setReward(this.reward);
        score.updateScore();
    },
    dropAndUpdata:function(){
        var finished = cc.callFunc(function(targe)
            {
                this.check();
            },this 
        );
        //因为stars已经删掉了 所有length会变
        for(var i = 0; i < this.stars.length ;i++){
            for (var j = 0 ; j < this.stars[i].length ;j++)
            {
              //  cc.log('jhhhhhhhhh',this.star.length,this.star[i].length);
                if(i == this.stars.length - 1 && j == this.stars[i].length -1){
                    var act = cc.sequence(cc.moveTo(1,this.pSet[i][j]),finished);
                }
                else{
                    var act = cc.moveTo(1,this.pSet[i][j]);
                }
                this.stars[i][j].runAction(act);
                var com = this.stars[i][j].getComponent('star');
                com.pos = cc.v2(i,j);
            }
        }
    },
    changeTwoPos:function(p1,p2){//交换两个star的位置 包括自身存储的位置信息与stars数组内的实例交换
        this.stars[p1.x][p1.y].getComponent('star').pos=p2;
        this.stars[p1.x][p1.y].setPosition(this.pSet[p2.x][p2.y]);
        this.stars[p2.x][p2.y].getComponent('star').pos=p1;
        this.stars[p2.x][p2.y].setPosition(this.pSet[p1.x][p1.y]);
        var t=this.stars[p1.x][p1.y];
        this.stars[p1.x][p1.y]=this.stars[p2.x][p2.y];
        this.stars[p2.x][p2.y]=t;
        
        
    },
    // update (dt) {},
});
