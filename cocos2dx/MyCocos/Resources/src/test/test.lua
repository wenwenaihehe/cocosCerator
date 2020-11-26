--[[
    luaide  模板位置位于 Template/FunTemplate/NewFileTemplate.lua 其中 Template 为配置路径 与luaide.luaTemplatesDir
    luaide.luaTemplatesDir 配置 https://www.showdoc.cc/web/#/luaide?page_id=713062580213505
    author:{author}
    time:2020-11-26 23:19:30
]]
local MainScene = class("MainScene", function()
        return cc.Scene:create()   
    end
)
function MainScene:ctor()
    local Node = cc.Node:create()
    local test = cc.Sprite:create("res/queen_BG.png")
    self:addChild(test)
    local t = cc.Director:getInstance():replaceScene(self)
    print("1111", t)
    --:replaceScene(self);
end
return MainScene