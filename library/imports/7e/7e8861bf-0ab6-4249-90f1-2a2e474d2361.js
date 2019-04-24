"use strict";
cc._RF.push(module, '7e886G/CrZCSZDxKi5HTSNh', 'hall');
// scripts/hall.js

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
        prefab_table_1v1: {
            default: null,
            type: cc.Prefab
        },
        prefab_table_2v2: {
            default: null,
            type: cc.Prefab
        },
        content: {
            default: null,
            type: cc.Node
        },
        list_bt: cc.Button, //
        notice_bt: cc.Button, //
        create_bt: cc.Button, //
        single_bt: cc.Button, //
        double_bt: cc.Button, //
        set_bt: cc.Button, //
        out_bt: cc.Button //
    },

    update: function update() {
        // var table_1_ = cc.find("Canvas/rooms/view/content/table_1");
        // table_1_.x = table_1_.x+100;
    },
    onMessage: function onMessage(obj) {
        var data = JSON.parse(obj.data);
        // console.log(data);

        if (data && data.code == 'hall') {
            //大厅消息
            console.log(data);
            onfire.clear();
        }
    },
    onLoad: function onLoad() {
        this.global = require('./global');
        this.netControl = require('./util/NetControl');
        //绑定消息事件
        this.msssageFire = onfire.on("onmessage", this.onMessage.bind(this));

        this.netControl.send('{"method":"tables"}');

        this.scheduleOnce(function () {
            this.init_table();
            this.init_table_position();
        }, 0);
        this.out_bt.node.on('click', this.on_out_bt, this);

        //预加载场景
        cc.director.preloadScene('hall');
    },
    init_table_position: function init_table_position() {

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 1; j++) {
                var table_name = "table_1v1_" + (j * 3 + i);
                var table = cc.find("Canvas/rooms/view/content/" + table_name);
                table.setPosition(table.x + i * 350 - 350, table.y - j * 350 - 200);
            }
        }

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var table_name = "table_2v2_" + (j * 3 + i);
                var table = cc.find("Canvas/rooms/view/content/" + table_name);
                table.setPosition(table.x + i * 350 - 350, table.y - j * 350 - 350 - 200);
            }
        }
    },
    init_table: function init_table() {

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 1; j++) {
                var table = cc.instantiate(this.prefab_table_1v1);
                table.name = "table_1v1_" + (j * 3 + i);
                var name = table.getChildByName('name');
                name.getComponent(cc.Label).string = "1v1_" + (j * 3 + i);
                table.parent = this.content;
            }
        }

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var table = cc.instantiate(this.prefab_table_2v2);
                table.name = "table_2v2_" + (j * 3 + i);
                var name = table.getChildByName('name');
                name.getComponent(cc.Label).string = "2v2_" + (j * 3 + i);
                table.parent = this.content;
            }
        }
    },
    on_out_bt: function on_out_bt() {
        var netControl = require('./util/NetControl');
        netControl.close();
        cc.director.loadScene('index');
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();