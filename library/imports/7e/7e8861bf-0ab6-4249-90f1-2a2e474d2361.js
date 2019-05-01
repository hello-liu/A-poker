"use strict";
cc._RF.push(module, '7e886G/CrZCSZDxKi5HTSNh', 'hall');
// scripts/hall.js

"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class(_defineProperty({
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
        out_bt: cc.Button, //

        list_page: cc.Node,
        notice_page: cc.Node,
        create_page: cc.Node,
        single_page: cc.Node,
        double_page: cc.Node,
        set_page: cc.Node
    },

    update: function update() {
        // var table_1_ = cc.find("Canvas/rooms/view/content/table_1");
        // table_1_.x = table_1_.x+100;
    },
    onMessage: function onMessage(obj) {
        var data = JSON.parse(obj.data);
        console.log(data);

        if (data && data.table) {
            // 收到桌的消息说明加入到桌子中
            cc.director.loadScene('room');
            return;
        }
        if (data && data.tables) {
            //返回了 tables消息，设置桌子的信息
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data.tables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var table = _step.value;

                    var table_name = table.id;
                    if (table.player_up) {
                        //上有人显示人名字
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_up/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = table.player_up.name;
                        }
                    } else {
                        //没得人显示加入
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_up/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = '加入';
                        }
                    }
                    if (table.player_down) {
                        //上有人显示人名字
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_down/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = table.player_down.name;
                        }
                    } else {
                        //没得人显示加入
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_down/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = '加入';
                        }
                    }
                    if (table.player_left) {
                        //上有人显示人名字
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_left/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = table.player_left.name;
                        }
                    } else {
                        //没得人显示加入
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_left/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = '加入';
                        }
                    }
                    if (table.player_right) {
                        //上有人显示人名字
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_right/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = table.player_right.name;
                        }
                    } else {
                        //没得人显示加入
                        var node = cc.find("Canvas/rooms/view/content/" + table_name + "/sit_right/Background/Label");
                        if (node) {
                            var lable = node.getComponent(cc.Label);
                            lable.string = '加入';
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return;
        }
    },
    onLoad: function onLoad() {
        this.global = require('./global');
        this.netControl = require('./util/NetControl');
        //绑定消息事件
        this.netControl.bind_event('message', this.onMessage, this);

        this.scheduleOnce(function () {
            this.init_table();
            this.netControl.send('{"method":"tables"}');
            this.init_table_position();
        }, 0);

        //绑定点击事件
        this.out_bt.node.on('click', this.on_out_bt, this);

        this.list_bt.node.on('click', this.onPage, this);
        this.list_page.on(cc.Node.EventType.TOUCH_START, this.onPage, this);
        this.list_page.mv = 'stop_up';

        this.notice_bt.node.on('click', this.onPage, this);
        this.notice_page.on(cc.Node.EventType.TOUCH_START, this.onPage, this);
        this.notice_page.mv = 'stop_up';

        this.create_bt.node.on('click', this.onPage, this);
        this.create_page.on(cc.Node.EventType.TOUCH_START, this.onPage, this);
        this.create_page.mv = 'stop_up';

        this.single_bt.node.on('click', this.onPage, this);
        this.single_page.on(cc.Node.EventType.TOUCH_START, this.onPage, this);
        this.single_page.mv = 'stop_up';

        this.double_bt.node.on('click', this.onPage, this);
        this.double_page.on(cc.Node.EventType.TOUCH_START, this.onPage, this);
        this.double_page.mv = 'stop_up';

        this.set_bt.node.on('click', this.onPage, this);
        this.set_page.on(cc.Node.EventType.TOUCH_START, this.onPage, this);
        this.set_page.mv = 'stop_up';

        //预加载场景
        cc.director.preloadScene('hall');
    },
    onPage: function onPage(event) {

        var node = event.target;

        if (node == this.list_bt.node) {
            node = this.list_page;
        } else if (node == this.notice_bt.node) {
            node = this.notice_page;
        } else if (node == this.create_bt.node) {
            node = this.create_page;
        } else if (node == this.single_bt.node) {
            node = this.single_page;
        } else if (node == this.double_bt.node) {
            node = this.double_page;
        } else if (node == this.set_bt.node) {
            node = this.set_page;
        }

        if (node.mv == 'stop_up') {
            node.mv = 'mv_down';
        } else if (node.mv == 'mv_down') {
            node.mv = 'mv_up';
        } else if (node.mv == 'mv_up') {
            node.mv = 'mv_down';
        } else if (node.mv == 'stop_down') {
            node.mv = 'mv_up';
        } else {
            node.mv = 'mv_down';
        }
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
}, "update", function update(dt) {
    var speed = 20;
    // this.list_page.setPosition(this.list_page.x, this.list_page.y-speed)

    //移动
    if (this.list_page.mv == 'mv_up') {
        this.list_page.y += speed;
    } else if (this.list_page.mv == 'mv_down') {
        this.list_page.y -= speed;
    }
    //移动后的位置判断
    if (this.list_page.y < 0) {
        this.list_page.mv = 'stop_down';
    } else if (this.list_page.y > 755) {
        this.list_page.mv = 'stop_up';
    }

    //移动
    if (this.notice_page.mv == 'mv_up') {
        this.notice_page.y += speed;
    } else if (this.notice_page.mv == 'mv_down') {
        this.notice_page.y -= speed;
    }
    //移动后的位置判断
    if (this.notice_page.y < 0) {
        this.notice_page.mv = 'stop_down';
    } else if (this.notice_page.y > 755) {
        this.notice_page.mv = 'stop_up';
    }

    //移动
    if (this.create_page.mv == 'mv_up') {
        this.create_page.y += speed;
    } else if (this.create_page.mv == 'mv_down') {
        this.create_page.y -= speed;
    }
    //移动后的位置判断
    if (this.create_page.y < 0) {
        this.create_page.mv = 'stop_down';
    } else if (this.create_page.y > 755) {
        this.create_page.mv = 'stop_up';
    }

    //移动
    if (this.single_page.mv == 'mv_up') {
        this.single_page.y += speed;
    } else if (this.single_page.mv == 'mv_down') {
        this.single_page.y -= speed;
    }
    //移动后的位置判断
    if (this.single_page.y < 0) {
        this.single_page.mv = 'stop_down';
    } else if (this.single_page.y > 755) {
        this.single_page.mv = 'stop_up';
    }

    //移动
    if (this.double_page.mv == 'mv_up') {
        this.double_page.y += speed;
    } else if (this.double_page.mv == 'mv_down') {
        this.double_page.y -= speed;
    }
    //移动后的位置判断
    if (this.double_page.y < 0) {
        this.double_page.mv = 'stop_down';
    } else if (this.double_page.y > 755) {
        this.double_page.mv = 'stop_up';
    }

    //移动
    if (this.set_page.mv == 'mv_up') {
        this.set_page.y += speed;
    } else if (this.set_page.mv == 'mv_down') {
        this.set_page.y -= speed;
    }
    //移动后的位置判断
    if (this.set_page.y < 0) {
        this.set_page.mv = 'stop_down';
    } else if (this.set_page.y > 755) {
        this.set_page.mv = 'stop_up';
    }
}));

cc._RF.pop();