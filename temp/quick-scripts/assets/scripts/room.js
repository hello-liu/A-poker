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
        prefab_poker: {
            default: null,
            type: cc.Prefab
        },
        layout: cc.Layout,
        poker_up: cc.Sprite,
        poker_left: cc.Sprite,
        poker_down: cc.Sprite,
        poker_right: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        console.log('room onLoad');

        this.util = require('./util/util');
        //绑定消息事件
        // this.msssageFire=onfire.on("onmessage",this.onMessage.bind(this));

        //设置当前能选几张牌
        this.curr_poker_num = 4;
        //当前选中的牌
        this.curr_poker = [];

        //按钮事件
        this.out_bt.node.on('click', this.on_out_bt, this);

        //加载扑克牌图片资源
        this.load_pokers();
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

            that.setPokers();
        });
        console.log(that.pokers);
    },

    //设置显示的牌
    setPokers: function setPokers() {
        console.log('room setPokers');

        //设置当前玩家手中的牌
        var pokers = [202, 203, 204, 205, 207, 208, 209, 210, 211, 111, 212, 313, 414, 305, 111, 212];
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
                pokersNode.parent = this.layout.node;
                img.on(cc.Node.EventType.TOUCH_START, this.onPoker, this);
                img.on(cc.Node.EventType.TOUCH_MOVE, this.onPoker, this);
            }

            //设置每个玩家出的牌
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

        var up_poker = 114;
        var down_poker = 214;
        var left_poker = 314;
        var right_poker = 414;
        this.poker_up.spriteFrame = this.pokers[up_poker];
        this.poker_down.spriteFrame = this.pokers[down_poker];
        this.poker_left.spriteFrame = this.pokers[left_poker];
        this.poker_right.spriteFrame = this.pokers[right_poker];
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
        console.log(event);
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
        cc.director.loadScene('hall');
    },


    onMessage: function onMessage(obj) {
        console.log('room onMessage');
        console.log(obj);
        // onfire.clear();
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
        