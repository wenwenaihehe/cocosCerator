//分发事件
var EventListnenerTarget = new cc.EventTarget;
EventListnenerTarget.addEventListener = function(Name,callBack,Target)
{
    EventListnenerTarget.on(Name,callBack,Target);
}
EventListnenerTarget.EmitEvent = function(Name,event)
{
    EventListnenerTarget.emit(Name,event);
}
module.exports = EventListnenerTarget;