(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/room.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '797eb4g2slKxa6/knbeAttf', 'room', __filename);
// scripts/room.js

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
        out_bt: cc.Button,
        voice_bt: cc.Button,
        talk_bt: cc.Button,
        ready_bt: cc.Button,
        no_ready_bt: cc.Button,
        play_bt: cc.Button,

        prefab_poker: cc.Prefab,
        prefab_call_btn: cc.Prefab,

        pokers_layout: cc.Layout,
        call_layout: cc.Layout,
        call_node: cc.Node,

        poker_up: cc.Sprite,
        poker_left: cc.Sprite,
        poker_down: cc.Sprite,
        poker_right: cc.Sprite,

        up_lable: cc.Label,
        left_lable: cc.Label,
        right_lable: cc.Label,

        pointer: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        console.log('room onLoad');

        this.global = require('./global');
        this.netControl = require('./util/NetControl');
        //绑定消息事件
        this.netControl.bind_event('message', this.onMessage, this);

        this.util = require('./util/util');
        //绑定消息事件
        // this.msssageFire=onfire.on("onmessage",this.onMessage.bind(this));

        //设置当前能选几张牌
        this.curr_poker_num = 1;
        //当前选中的牌
        this.curr_poker = [];

        //按钮事件
        this.out_bt.node.on('click', this.on_out_bt, this);
        this.ready_bt.node.on('click', this.on_ready_bt, this);
        this.no_ready_bt.node.on('click', this.on_no_ready_bt, this);
        this.play_bt.node.on('click', this.on_play, this);

        //加载扑克牌图片资源
        this.load_pokers();
    },
    on_play: function on_play() {
        if (this.curr_poker_num == 1) {
            //出牌
            var p_1 = this.curr_poker[0].poker;
            this.netControl.send('{"method":"play","roomId":"' + this.global.table + '","sit":"' + this.global.sit + '","play":' + p_1 + ' }');
            //初始化选择的牌
            this.curr_poker = [];
        } else {
            //扣牌
            if (this.curr_poker.length == 4) {

                var p_1 = this.curr_poker[0].poker;
                var p_2 = this.curr_poker[1].poker;
                var p_3 = this.curr_poker[2].poker;
                var p_4 = this.curr_poker[3].poker;

                if (p_1 % 5 == 0 || p_1 % 100 == 14 || p_2 % 5 == 0 || p_2 % 100 == 14 || p_3 % 5 == 0 || p_3 % 100 == 14 || p_4 % 5 == 0 || p_4 % 100 == 14) {
                    // 不能扣分
                    return;
                }
                //初始化选择的牌
                this.curr_poker = [];
                this.netControl.send('{"method":"holding","roomId":"' + this.global.table + '","sit":"' + this.global.sit + '","holding":[' + p_1 + ',' + p_2 + ',' + p_3 + ',' + p_4 + '] }');
            }
        }
    },

    //准备
    on_ready_bt: function on_ready_bt() {
        this.netControl.send('{"method":"ready","roomId":"' + this.global.table + '","sit":"' + this.global.sit + '","playerId":"' + this.global.id + '"}');
    },

    //取消准备
    on_no_ready_bt: function on_no_ready_bt() {
        this.netControl.send('{"method":"noReady","roomId":"' + this.global.table + '","sit":"' + this.global.sit + '","playerId":"' + this.global.id + '"}');
    },


    //加载扑克牌资源
    load_pokers: function load_pokers() {

        console.log('room load_pokers');

        var that = this;
        that.pokers = {};
        cc.loader.loadResDir('pokers', cc.SpriteFrame, function (err, ress) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = ress[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var p = _step.value;

                    that.pokers[p.name] = p;
                }
                //获取当前桌的消息
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

            that.netControl.send('{"method":"table","roomId":"' + that.global.table + '"}');
        });

        console.log(that.pokers);
    },


    //牌事件
    onPoker: function onPoker(event) {
        console.log('room onPoker');

        // console.log(event);
        if (event.type == 'touchmove') {
            if (event.currentTarget.poker != event.target.poker) {
                console.log("diff");
                console.log(currentTarget);
                console.log(target);
            }
            return;
        }
        // console.log(event);
        //点击的节点
        var curr = event.currentTarget;
        //移动牌
        var p = curr.getPosition();
        if (p.y == 25) {
            curr.setPosition(0, 0);
            //删除取消的牌
            this.curr_poker = this.util.arrayDel(this.curr_poker, this.curr_poker.indexOf(curr));
        } else {
            //根据选牌数删除多余的牌
            curr.setPosition(0, 25);
            var num = this.curr_poker.push(curr);
            if (num > this.curr_poker_num) {
                var rm_poker = this.curr_poker.shift();
                rm_poker.setPosition(0, 0);
            }
        }
    },


    //退出按钮返回到大厅
    on_out_bt: function on_out_bt() {
        var netControl = require('./util/NetControl');
        var global = require('./global');

        netControl.send('{"method":"out","roomId":"' + global.table + '","sit":"' + global.sit + '","playerId":"' + global.name + '"}');
        cc.director.loadScene('hall');
    },


    onMessage: function onMessage(obj) {
        console.log('room onMessage');
        var data = JSON.parse(obj.data);

        if (data && data.table) {
            //返回桌子消息，则显示当前桌面的信息
            this.set_table(data);
        }
    },

    set_table: function set_table(data) {
        console.log(data);
        var sit = this.global.sit;
        var pokers = [414, 413, 412, 411, 410, 409, 408, 407, 406, 405, 404, 403, 402];
        if (data.statu != 'wait') {
            pokers = data["player_" + sit].pokers;
        }
        //显示玩家的牌
        if (pokers) {
            this.pokers_layout.node.removeAllChildren();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = pokers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var p = _step2.value;

                    var pokersNode = cc.instantiate(this.prefab_poker);
                    var img = pokersNode.getChildByName('img');
                    img.getComponent(cc.Sprite).spriteFrame = this.pokers[p];
                    img.poker = p;
                    pokersNode.parent = this.pokers_layout.node;
                    img.on(cc.Node.EventType.TOUCH_START, this.onPoker, this);
                    img.on(cc.Node.EventType.TOUCH_MOVE, this.onPoker, this);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        //处理每个玩家
        var sit = this.global.sit;

        //计算每个玩家和当前玩家的相对位置
        var lun = ['up', 'left', 'down', 'right'];

        //指示当前出牌的人
        var index_my = lun.indexOf(sit);
        if (data.statu == 'wait' || data.statu == 'clear') {
            this.pointer.rotation = 90;
        } else if (data.currentplayer) {
            var index_curr = lun.indexOf(data.currentplayer);
            this.pointer.rotation = (index_curr - index_my) * 90 + 90;
        } else {
            this.pointer.rotation = 90;
        }

        //显示桌面的info
        //显示每个玩家出的牌


        var index = lun.indexOf(sit);
        var idx = index + 1 >= lun.length ? index + 1 - lun.length : index + 1;
        var right = lun[idx];
        idx = index + 2 >= lun.length ? index + 2 - lun.length : index + 2;
        var up = lun[idx];
        idx = index + 3 >= lun.length ? index + 3 - lun.length : index + 3;
        var left = lun[idx];

        //显示每个玩家的名字
        //显示 up 
        var player_up = data['player_' + up];
        var player_left = data['player_' + left];
        var player_right = data['player_' + right];

        if (player_up) {
            this.up_lable.string = player_up.name;
        } else {
            this.up_lable.string = '';
        }
        if (player_left) {
            this.left_lable.string = player_left.name;
        } else {
            this.left_lable.string = '';
        }
        if (player_right) {
            this.right_lable.string = player_right.name;
        } else {
            this.right_lable.string = '';
        }

        if (data.statu == 'call' && data.currentplayer == sit) {
            //当前是我叫
            this.call_node.y = 0;
            //生成叫分按钮
            var currentCall = data.currentCall;
            if (currentCall == 1) {
                currentCall = 0;
            }

            this.call_layout.node.removeAllChildren();

            //不叫
            var btn = cc.instantiate(this.prefab_call_btn);
            btn.parent = this.call_layout.node;
            var lableNode = btn.getChildByName('Background').getChildByName('Label');
            lableNode.getComponent(cc.Label).string = '不要';
            btn.on(cc.Node.EventType.TOUCH_START, this.onCall, this);
            btn.call = 0;

            var calls = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
            for (var i = currentCall + 5; i <= 100; i += 5) {
                var btn = cc.instantiate(this.prefab_call_btn);
                btn.parent = this.call_layout.node;
                var lableNode = btn.getChildByName('Background').getChildByName('Label');
                btn.call = i;
                lableNode.getComponent(cc.Label).string = i;
                btn.on(cc.Node.EventType.TOUCH_START, this.onCall, this);
            }
        } else if (data.statu == 'major' && data.currentplayer == sit) {
            //当前是我叫
            this.call_node.y = 0;
            //生成按钮

            this.call_layout.node.removeAllChildren();

            //黑
            var btn = cc.instantiate(this.prefab_call_btn);
            btn.parent = this.call_layout.node;
            var lableNode = btn.getChildByName('Background').getChildByName('Label');
            lableNode.getComponent(cc.Label).string = '♠️';
            btn.on(cc.Node.EventType.TOUCH_START, this.onMajor, this);
            btn.major = 100;

            //红
            var btn = cc.instantiate(this.prefab_call_btn);
            btn.parent = this.call_layout.node;
            var lableNode = btn.getChildByName('Background').getChildByName('Label');
            lableNode.getComponent(cc.Label).string = '♥️';
            btn.on(cc.Node.EventType.TOUCH_START, this.onMajor, this);
            btn.major = 200;

            //梅
            var btn = cc.instantiate(this.prefab_call_btn);
            btn.parent = this.call_layout.node;
            var lableNode = btn.getChildByName('Background').getChildByName('Label');
            lableNode.getComponent(cc.Label).string = '♣️';
            btn.on(cc.Node.EventType.TOUCH_START, this.onMajor, this);
            btn.major = 300;

            //方
            var btn = cc.instantiate(this.prefab_call_btn);
            btn.parent = this.call_layout.node;
            var lableNode = btn.getChildByName('Background').getChildByName('Label');
            lableNode.getComponent(cc.Label).string = '♦️';
            btn.on(cc.Node.EventType.TOUCH_START, this.onMajor, this);
            btn.major = 400;
        } else if (data.statu == 'holding' && data.currentplayer == sit) {
            //扣牌
            //能选4张牌
            this.curr_poker_num = 4;
            this.call_node.y = 750;
        } else {
            this.call_node.y = 750;
            this.curr_poker_num = 1;
        }
    },

    onMajor: function onMajor(event) {
        var major = event.target.major;
        this.netControl.send(' {"method":"major","roomId":"' + this.global.table + '","sit":"' + this.global.sit + '","playerId":"' + this.global.id + '","major":' + major + '} ');
    },
    onCall: function onCall(event) {

        var call = event.target.call;
        if (call == '不要') {
            call = 0;
        }
        this.netControl.send(' {"method":"call","roomId":"' + this.global.table + '","sit":"' + this.global.sit + '","playerId":"' + this.global.id + '","call":' + call + '} ');
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
        //# sourceMappingURL=room.js.map
        