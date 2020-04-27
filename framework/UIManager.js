//一些方法集成一下
var UIManager = {};
UIManager.Prefab = {};
UIManager.seekNodeByName = function(node,Name)
{
    if (node == null || Name == null)
    {
        return null;
    }
    if (typeof(Name) != "string")
    {
        return null;
    }
    let reNode = null;
    let ChildrenNode =node.getChildren();
    for (let i = 0 ; i < ChildrenNode.length; i++)
    {
        if (ChildrenNode[i]._name == Name)
        {
            return ChildrenNode[i];
        }
        else{
            reNode = this.seekNodeByName(ChildrenNode[i],Name);
            if (reNode != null)
            {
                return reNode;
            }
        }
    }
    return null;
};

//针对普通的loadTexture
UIManager.loadTexture = function(url , node , Type)
{
    cc.loader.loadRes(url,function(error,Image)
    {
        if (error == null && Image)
        {
            if (Type != undefined)
            {
                node.spriteFrame = new Type(Image);
            }
            else
            {
                node.spriteFrame = Image;
            }
        }
    })
};
UIManager.loadButtonTexture = function(button,url1,url2,url3,Type)
{   
    Type = Type?Type:cc.SpriteFrame;
    var Texture1 = cc.loader.getRes(url1);
    if(Texture1)
    {
        button.normalSprite = new Type(Texture1);
    }
    var Texture2 = cc.loader.getRes(url2);
    if(Texture2)
    {
        button.pressedSprite = new Type(Texture2);
    }
    var Texture3 = cc.loader.getRes(url3)
    if(Texture3)
    {
        button.disabledSprite = new Type(Texture3);
    }
}
UIManager.getTexture = function(url,Type)
{
    var Texture = cc.loader.getRes(url);
    if(Texture) 
    {
        return new Type(Texture);
    }
    return null;
}

UIManager.loadPrefab = function(url)
{
    return cc.loader.getRes(url);
}
UIManager.loadAll = function()
{
    //cc.loader.loadResDir("");
}
cc.loader.loadResDir("");
module.exports = UIManager;