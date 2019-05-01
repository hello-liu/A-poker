(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/table_1v1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd7c0cH+Sl9D3abi9JwfdXmo', 'table_1v1', __filename);
// scripts/table_1v1.js

'use strict';

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

        this.global = require('./global');
        this.netControl = require('./util/NetControl');
        //绑定消息事件
        // this.msssageFire=onfire.on("onmessage",this.onMessage.bind(this));

        //按钮事件
        this.up_bt.node.on('click', this.on_up_bt, this);
        this.down_bt.node.on('click', this.on_down_bt, this);
    },

    onMessage: function onMessage(obj) {
        var data = obj.data;
        if (data && data.code != 'hall') {
            //大厅消息
            console.log(data);
            onfire.clear();
        }
    },
    on_up_bt: function on_up_bt() {
        console.log('on_up_bt');
        var table_name = this.node.name;
        var player_name = this.global.name;
        this.global.table = table_name;
        this.global.sit = 'up';

        this.netControl.send('{"method":"in","roomId":"' + table_name + '","sit":"up","type":"1v1","playerId":"' + player_name + '","playerName":"' + player_name + '"}');
    },
    on_down_bt: function on_down_bt() {
        console.log('on_down_bt');
        var table_name = this.node.name;
        var player_name = this.global.name;
        this.global.table = table_name;
        this.global.sit = 'down';

        this.netControl.send('{"method":"in","roomId":"' + table_name + '","sit":"down","type":"1v1","playerId":"' + player_name + '","playerName":"' + player_name + '"}');
        // cc.director.loadScene('room');
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
        