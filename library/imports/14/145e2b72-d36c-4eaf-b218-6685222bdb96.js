"use strict";
cc._RF.push(module, '145e2ty02xOr7IYZoUiK9uW', 'Index');
// scripts/Index.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        name_input: cc.EditBox,
        login_bt: cc.Button,
        wx_login_bt: cc.Button,
        login_tip_lb: cc.Label
    },

    onLoad: function onLoad() {

        this.login_bt.node.on('click', this.startScene, this);
        this.wx_login_bt.node.on('click', this.startScene, this);

        //预加载场景
        cc.director.preloadScene('hall');
    },


    //当连接建立时
    onOpen: function onOpen() {
        var global = require('./global');
        var netControl = require('./util/NetControl');
        netControl.send(' {"method":"iam","name":"' + global.name + '"} ');
        cc.director.loadScene('hall');
    },


    //绑定用户按钮事件
    startScene: function startScene(event) {
        switch (event.node.name) {
            case 'login_bt':
                var name = this.name_input.string;
                console.log("name:" + name);
                if (name) {
                    //全局变量
                    var global = require('./global');
                    var netControl = require('./util/NetControl');
                    netControl.connect();
                    netControl.bind_event('open', this.onOpen);
                    global.name = name;
                    global.id = name;
                    //绑定事件
                    this.login_tip_lb.string = '网络连接中。。。';
                } else {
                    this.login_tip_lb.string = '请输入用户名！';
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