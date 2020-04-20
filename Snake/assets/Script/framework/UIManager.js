
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