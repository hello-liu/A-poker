(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/table_1v1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd7c0cH+Sl9D3abi9JwfdXmo', 'table_1v1', __filename);
// scripts/table_1v1.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        sit_up_lable: cc.Label,
        sit_down_lable: cc.Label,
        up_bt: cc.Button,
        down_bt: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // console.log('table onload');
        // console.log(this.sit_up_lable.string);
        // this.sit_up_lable.string = '阿拉蕾';

        //连接服务器
        this.netControl = require('./util/NetControl');
        console.log("开始连接");
        this.netControl.connect();
        console.log("连接完成");
        this.msssageFire = onfire.on("onmessage", this.onMessage.bind(this));

        //按钮事件
        this.up_bt.node.on('click', this.on_up_bt, this);
        this.down_bt.node.on('click', this.on_down_bt, this);
    },

    onMessage: function onMessage(obj) {
        console.log(obj);
        onfire.clear();
    },
    on_up_bt: function on_up_bt() {
        console.log('on_up_bt');
        cc.director.loadScene('room');

        // this.netControl.send('{"method":"in","roomId":"'+this.node.name+'","sit":"up","type":"1v1","playerId":1,"playerName":"张三"}' );
    },
    on_down_bt: function on_down_bt() {
        console.log('on_down_bt');
        cc.director.loadScene('room');
        // this.netControl.send('{"method":"in","roomId":"'+this.node.name+'","sit":"down","type":"1v1","playerId":2,"playerName":"李四"}' );
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=table_1v1.js.map
        