
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2cc39JjEbRMf7U44EjwnwKD', 'Player');
// scripts/Player.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    jumpHeight: 0,
    // 主角跳跃持续时间
    jumpDuration: 0,
    // 最大移动速度
    maxMoveSpeed: 0,
    // 加速度
    accel: 0
  },
  StartHeight: function StartHeight() {
    // 跳跃上升
    var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut()); // 下落

    var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()); // 不断重复

    return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // 初始化跳跃动作
    this.jumpHeight = 150;
    this.maxMoveSpeed = 400;
    this.jumpDuration = 0.3;
    this.accel = 1000;
    this.jumpAction = this.StartHeight();
    this.node.runAction(this.jumpAction);
    this.accLeft = false;
    this.accRight = false; // 主角当前水平方向速度

    this.xSpeed = 0; // 初始化键盘输入监听

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  onKeyDown: function onKeyDown(event) {
    // set a flag when key pressed
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;

      case cc.macro.KEY.d:
        this.accRight = true;
        break;
    }
  },
  onKeyUp: function onKeyUp(event) {
    // unset a flag when key released
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;

      case cc.macro.KEY.d:
        this.accRight = false;
        break;
    }
  },
  update: function update(dt) {
    // 根据当前加速度方向每帧更新速度
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    } // 限制主角的速度不能超过最大值


    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      // if speed reach limit, use max speed with current direction
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    } // 根据当前速度更新主角的位置


    this.node.x += this.xSpeed * dt;
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwianVtcEhlaWdodCIsImp1bXBEdXJhdGlvbiIsIm1heE1vdmVTcGVlZCIsImFjY2VsIiwiU3RhcnRIZWlnaHQiLCJqdW1wVXAiLCJtb3ZlQnkiLCJ2MiIsImVhc2luZyIsImVhc2VDdWJpY0FjdGlvbk91dCIsImp1bXBEb3duIiwiZWFzZUN1YmljQWN0aW9uSW4iLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJvbkxvYWQiLCJqdW1wQWN0aW9uIiwibm9kZSIsInJ1bkFjdGlvbiIsImFjY0xlZnQiLCJhY2NSaWdodCIsInhTcGVlZCIsInN5c3RlbUV2ZW50Iiwib24iLCJTeXN0ZW1FdmVudCIsIkV2ZW50VHlwZSIsIktFWV9ET1dOIiwib25LZXlEb3duIiwiS0VZX1VQIiwib25LZXlVcCIsImV2ZW50Iiwia2V5Q29kZSIsIm1hY3JvIiwiS0VZIiwiYSIsImQiLCJ1cGRhdGUiLCJkdCIsIk1hdGgiLCJhYnMiLCJ4Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUUsQ0FESjtBQUVSO0FBQ0FDLElBQUFBLFlBQVksRUFBRSxDQUhOO0FBSVI7QUFDQUMsSUFBQUEsWUFBWSxFQUFFLENBTE47QUFNUjtBQUNBQyxJQUFBQSxLQUFLLEVBQUU7QUFQQyxHQUhQO0FBYUxDLEVBQUFBLFdBQVcsRUFBQyx1QkFDWjtBQUFHO0FBQ0MsUUFBSUMsTUFBTSxHQUFHVCxFQUFFLENBQUNVLE1BQUgsQ0FBVSxLQUFLTCxZQUFmLEVBQTZCTCxFQUFFLENBQUNXLEVBQUgsQ0FBTSxDQUFOLEVB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QixNQUF6QixHQUFrQ2lCLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUtsQixNQUFkLENBQWhEO0FBQ0gsS0FYaUIsQ0FhbEI7OztBQUNBLFNBQUtKLElBQUwsQ0FBVXVCLENBQVYsSUFBZSxLQUFLbkIsTUFBTCxHQUFjZ0IsRUFBN0I7QUFDSCxHQXJGSTtBQXVGTEksRUFBQUEsS0F2RkssbUJBdUZJLENBRVIsQ0F6RkksQ0EyRkw7O0FBM0ZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBqdW1wSGVpZ2h0OiAwLFxyXG4gICAgICAgIC8vIOS4u+inkui3s+i3g+aMgee7reaXtumXtFxyXG4gICAgICAgIGp1bXBEdXJhdGlvbjogMCxcclxuICAgICAgICAvLyDmnIDlpKfnp7vliqjpgJ/luqZcclxuICAgICAgICBtYXhNb3ZlU3BlZWQ6IDAsXHJcbiAgICAgICAgLy8g5Yqg6YCf5bqmXHJcbiAgICAgICAgYWNjZWw6IDAsXHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXJ0SGVpZ2h0OmZ1bmN0aW9uKClcclxuICAgIHsgIC8vIOi3s+i3g+S4iuWNh1xyXG4gICAgICAgIHZhciBqdW1wVXAgPSBjYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sIGNjLnYyKDAsIHRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XHJcbiAgICAgICAgLy8g5LiL6JC9XHJcbiAgICAgICAgdmFyIGp1bXBEb3duID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy52MigwLCAtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xyXG4gICAgICAgIC8vIOS4jeaWremHjeWkjVxyXG4gICAgICAgIHJldHVybiBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24pKTtcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbot7Pot4PliqjkvZxcclxuICAgICAgICB0aGlzLmp1bXBIZWlnaHQgPSAxNTA7XHJcbiAgICAgICAgdGhpcy5tYXhNb3ZlU3BlZWQgPSA0MDA7XHJcbiAgICAgICAgdGhpcy5qdW1wRHVyYXRpb24gPSAwLjM7XHJcbiAgICAgICAgdGhpcy5hY2NlbCA9IDEwMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5qdW1wQWN0aW9uID0gdGhpcy5TdGFydEhlaWdodCgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24odGhpcy5qdW1wQWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyDkuLvop5LlvZPliY3msLTlubPmlrnlkJHpgJ/luqZcclxuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW6ZSu55uY6L6T5YWl55uR5ZCsXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTsgICBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uS2V5RG93biAoZXZlbnQpIHtcclxuICAgICAgICAvLyBzZXQgYSBmbGFnIHdoZW4ga2V5IHByZXNzZWRcclxuICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uS2V5VXAgKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gdW5zZXQgYSBmbGFnIHdoZW4ga2V5IHJlbGVhc2VkXHJcbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgLy8g5qC55o2u5b2T5YmN5Yqg6YCf5bqm5pa55ZCR5q+P5bin5pu05paw6YCf5bqmXHJcbiAgICAgICAgaWYgKHRoaXMuYWNjTGVmdCkge1xyXG4gICAgICAgICAgICB0aGlzLnhTcGVlZCAtPSB0aGlzLmFjY2VsICogZHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkICs9IHRoaXMuYWNjZWwgKiBkdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6ZmQ5Yi25Li76KeS55qE6YCf5bqm5LiN6IO96LaF6L+H5pyA5aSn5YC8XHJcbiAgICAgICAgaWYgKCBNYXRoLmFicyh0aGlzLnhTcGVlZCkgPiB0aGlzLm1heE1vdmVTcGVlZCApIHtcclxuICAgICAgICAgICAgLy8gaWYgc3BlZWQgcmVhY2ggbGltaXQsIHVzZSBtYXggc3BlZWQgd2l0aCBjdXJyZW50IGRpcmVjdGlvblxyXG4gICAgICAgICAgICB0aGlzLnhTcGVlZCA9IHRoaXMubWF4TW92ZVNwZWVkICogdGhpcy54U3BlZWQgLyBNYXRoLmFicyh0aGlzLnhTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmoLnmja7lvZPliY3pgJ/luqbmm7TmlrDkuLvop5LnmoTkvY3nva5cclxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnhTcGVlZCAqIGR0O1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==