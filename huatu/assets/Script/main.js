// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        brush:cc.Node,
        widthSilider:cc.Node,
        colorLayout:cc.Node,
        tollLayout:cc.Node
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.debug.setDisplayStats(false);
        this.lineWidth = 1;
        this.eraserWidth = 10;
        this.color = cc.Color.BLACK;
        this.toll = "BRUSH";
        this.node.on('touchstart',this.onTouchStart,this);
        this.node.on('touchmove',this.onTouchMove,this);
        this.shuazi = this.tollLayout.getChildByName("shuazi")
        this.xiangpi = this.tollLayout.getChildByName("xiangpi")
        this.shuazi.on('click',this.brushBtnEvent,this);
        this.xiangpi.on('click',this.eraserBtnEvent,this);
        for (let i=0; i<this.colorLayout.children.length; i++) {
            //this.colorLayout.children[i].interactable = false;
        }
    },
    onTouchStart(event){
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        var ass = this.brush.getComponent('Brush')
        ass.setBrushPos(pos.x, pos.y);
    },
    onTouchMove(event) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.brush.getComponent('Brush').drawTo(pos.x, pos.y);
    },
    onClientSlider(slider){
        // 调整笔刷粗细
        if (this.toll == 'BRUSH') {
            this.lineWidth = 1 + slider.progress * 5;
            this.brush.getComponent('Brush').setBrushLineWidth(this.lineWidth);
        }
        else if (this.toll == 'ERASER') {
            this.eraserWidth = 10 + slider.progress * 50;
            this.brush.getComponent('Brush').setBrushLineWidth(this.eraserWidth);
        }
    },
    // Game.js
    blackBtnEvent(sender) {
      
        if (this.toll == 'BRUSH') {
            this.color = cc.Color.BLACK;
            this.brush.getComponent('Brush').setBrushColor(this.color);

            for (let i=0; i<this.colorLayout.children.length; i++) {
                if (i==0)
                    {this.colorLayout.children[i].opacity = 255;}
                else 
                    {this.colorLayout.children[i].opacity = 100;}
            }

        }
    },
    redBtnEvent(sender){
        let name = sender.target.name;
        let backGruond = sender.target.getChildByName('Background') ;
        let color = backGruond.color;
        
       //sender.target.setTouchEnabled(false);
        if (this.toll == 'BRUSH') {
            this.color = new cc.Color(color.r, color.g, color.b,color.a);
            this.brush.getComponent('Brush').setBrushColor(this.color)
            for (let i=0; i<this.colorLayout.children.length; i++) {
                var namechild = this.colorLayout.children[i].name;
                if (this.colorLayout.children[i].name == name)
                    this.colorLayout.children[i].getComponent(cc.Button).interactable = false;
                else 
                    this.colorLayout.children[i].interactable = false;
            }
        }
    },
    greenBtnEvent() {  
        if (this.toll == 'BRUSH') {
            this.color = cc.Color.GREEN;
            this.brush.getComponent('Brush').setBrushColor(this.color);
    
            for (let i=0; i<this.colorLayout.children.length; i++) {
                if (i==2)
                    {this.colorLayout.children[i].opacity = 255;}
                else 
                    {this.colorLayout.children[i].opacity = 100;}
            }
        }
    },
    
    blueBtnEvent() {  
        if (this.toll == 'BRUSH') {
            this.color = cc.Color.BLUE;
            this.brush.getComponent('Brush').setBrushColor(this.color);
    
            for (let i=0; i<this.colorLayout.children.length; i++) {
                if (i==3)
                    {this.colorLayout.children[i].opacity = 255;}
                else 
                    {this.colorLayout.children[i].opacity = 100;}
            }
        }
    },
    
    yellowBtnEvent() {  
        if (this.toll == 'BRUSH') {
            this.color = cc.Color.YELLOW;
            this.brush.getComponent('Brush').setBrushColor(this.color);
    
            for (let i=0; i<this.colorLayout.children.length; i++) {
                if (i==4)
                    {this.colorLayout.children[i].opacity = 255;}
                else 
                    {this.colorLayout.children[i].opacity = 100;}
            }
        }
    },
    
    purpleBtnEvent() {  
        if (this.toll == 'BRUSH') {
            this.color = new cc.Color(255, 0, 255);
            this.brush.getComponent('Brush').setBrushColor(this.color);
    
            for (let i=0; i<this.colorLayout.children.length; i++) {
                if (i==5)
                    {this.colorLayout.children[i].opacity = 255;}
                else 
                    {this.colorLayout.children[i].opacity = 100;}
            }
        }
    },
    // Game.js
    brushBtnEvent() {
        // 设置笔刷为普通画笔
        this.tool = 'BRUSH';
        this.shuazi.getComponent(cc.Button).interactable = false
        this.xiangpi.getComponent(cc.Button).interactable = true
        // this.tollLayout.children[0].opacity = 255;
        // this.tollLayout.children[1].opacity = 100;
        this.brush.getComponent('Brush').setBrushColor(this.color);
        this.brush.getComponent('Brush').setBrushLineWidth(this.lineWidth);


        // 设置slider上的handle位置
        this.widthSilider.getComponent(cc.Slider).progress = (this.lineWidth-1) / 5;
    },

    eraserBtnEvent() {
        // 设置笔刷为橡皮擦(特殊笔刷)
        this.tool = 'ERASER';
        this.shuazi.getComponent(cc.Button).interactable = true
        this.xiangpi.getComponent(cc.Button).interactable = false
        this.brush.getComponent('Brush').setBrushColor(cc.Color.WHITE);
        this.brush.getComponent('Brush').setBrushLineWidth(this.eraserWidth);

        // 设置slider上的handle位置
        this.widthSilider.getComponent(cc.Slider).progress = (this.eraserWidth-10) / 50;
    }
    // start () {

    // },

    // update (dt) {},
});
