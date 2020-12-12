
cc.FileUtils:getInstance():setPopupNotify(false)
cc.FileUtils:getInstance():addSearchPath("Resources/src/")
cc.FileUtils:getInstance():addSearchPath("Resources/res/")

local breakSocketHandle,debugXpCall = require("LuaDebugjit")("192.168.0.103",7003)
cc.Director:getInstance():getScheduler():scheduleScriptFunc(breakSocketHandle, 0.3, false) 

require "config"
require "cocos.init"
-- require "Resources.src.test.test"

--如果已经存在 __G__TRACKBACK__ 请将 debugXpCall 直接加入 __G__TRACKBACK__ 即可
--__G__TRACKBACK__ 方法不是必须 debugXpCall是实现的是在lua 脚本调用错误时进行代码错误定位 

function __G__TRACKBACK__(msg)
    local msg = debug.traceback(msg, 3)
    print("--------------------------------")
    --print(msg)
    print("LUA ERROR: " .. tostring(msg).. "\n")
    print("---------------------------------------");

    debugXpCall(); 
    return msg 
end
local function main()
    --require("app.MyApp"):create():run()
    require("LobbyScene.initConfig")
end
local status, msg = xpcall(main, __G__TRACKBACK__)
if not status then
    print(msg)
end
