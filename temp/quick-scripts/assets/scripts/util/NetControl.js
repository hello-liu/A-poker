(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/util/NetControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '178ben1Us9KMZOa5UbmVL53', 'NetControl', __filename);
// scripts/util/NetControl.js

"use strict";

/**
 * Created by Administrator on 2018/4/17 0017.
 */
//定义全局的变量
var netConfig = require('NetConfig');
var NetControl = {
    _sock: {}, //当前的webSocket的对象
    // 消息事件list
    events_open: [],
    connect: function connect() {
        if (this._sock.readyState !== 1) {
            //当前接口没有打开
            //重新连接
            this._sock = new WebSocket(netConfig.host);
            this._sock.onmessage = this.onmessage;
            this._sock.onclose = this.onclose;
            this._sock.onopen = this.onopen;
        }
        return this;
    },

    send: function send(msg) {
        this._sock.send(msg);
        console.log("send msg" + msg);
    },
    close: function close() {
        console.log("_sock close");
        this._sock.close();
    },

    //事件
    onclose: function onclose(event) {
        console.log("_sock onclose");
    },
    //事件
    onopen: function onopen(event) {
        console.log("_sock onopen");
    },
    //事件
    onmessage: function onmessage(event) {
        console.log("_sock onmessage");
    },

    //绑定消息方法
    bind_event: function bind_event(e, f, that) {
        if (e == 'open') {
            this._sock.onopen = f;
        } else if (e == 'close') {
            this._sock.onclose = f;
        } else if (e == 'message') {
            this._sock.onmessage = f.bind(that);
        }
    }
};

module.exports = NetControl;

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
        //# sourceMappingURL=NetControl.js.map
        