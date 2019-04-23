"use strict";
cc._RF.push(module, '145e2ty02xOr7IYZoUiK9uW', 'Index');
// scripts/Index.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        name_input: cc.EditBox, // 联网案例体验
        login_bt: cc.Button, //联网流程
        wx_login_bt: cc.Button //范例说明
    },

    onLoad: function onLoad() {
        this.login_bt.node.on('click', this.startScene, this);
        this.wx_login_bt.node.on('click', this.startScene, this);
    },
    startScene: function startScene(event) {
        switch (event.node.name) {
            case 'login_bt':
                var name = this.name_input.string;
                console.log("name:" + name);
                if (name) {
                    var netControl = require('./util/NetControl');
                    console.log("开始连接");
                    netControl.connect();
                    console.log("连接完成");
                    cc.director.loadScene('hall');
                }
                break;
            case 'wx_login_bt':
                break;
            default:
                break;
        }
    }
}

// start () {},

// update (dt) {},
);

cc._RF.pop();