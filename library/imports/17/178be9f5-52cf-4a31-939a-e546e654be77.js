"use strict";
cc._RF.push(module, '178ben1Us9KMZOa5UbmVL53', 'NetControl');
// scripts/util/NetControl.js

"use strict";

/**
 * Created by Administrator on 2018/4/17 0017.
 */
//定义全局的变量
window.onfire = require("onfire"); //处理事件的类库
var netConfig = require('NetConfig');
var NetControl = {
    _sock: {}, //当前的webSocket的对象
    connect: function connect() {
        if (this._sock.readyState !== 1) {
            //当前接口没有打开
            //重新连接
            this._sock = new WebSocket(netConfig.host);
            this._sock.onopen = this._onOpen.bind(this);
            this._sock.onclose = this._onClose.bind(this);
            this._sock.onmessage = this._onMessage.bind(this);
        }
        return this;
    },

    _onOpen: function _onOpen() {
        onfire.fire("onopen");
    },
    _onClose: function _onClose(err) {
        onfire.fire("onclose", err);
    },
    _onMessage: function _onMessage(obj) {

        onfire.fire("onmessage", obj);
    },

    send: function send(msg) {
        this._sock.send(msg);
        console.log("send msg" + msg);
    },
    close: function close() {
        this._sock.close();
        console.log("_sock close");
    },
    onmessage: function onmessage(f) {
        this._sock.onmessage(f);
    }

};

module.exports = NetControl;

cc._RF.pop();