window.__require = function n(t, o, e) {
function i(r, u) {
if (!o[r]) {
if (!t[r]) {
var s = r.split("/");
s = s[s.length - 1];
if (!t[s]) {
var f = "function" == typeof __require && __require;
if (!u && f) return f(s, !0);
if (c) return c(s, !0);
throw new Error("Cannot find module '" + r + "'");
}
}
var l = o[r] = {
exports: {}
};
t[r][0].call(l.exports, function(n) {
return i(t[r][1][n] || n);
}, l, l.exports, n, t, o, e);
}
return o[r].exports;
}
for (var c = "function" == typeof __require && __require, r = 0; r < e.length; r++) i(e[r]);
return i;
}({
Index: [ function(n, t, o) {
"use strict";
cc._RF.push(t, "145e2ty02xOr7IYZoUiK9uW", "Index");
cc.Class({
extends: cc.Component,
properties: {
name_input: cc.EditBox,
login_bt: cc.Button,
wx_login_bt: cc.Button
},
onLoad: function() {
this.login_bt.node.on("click", this.startScene, this);
this.wx_login_bt.node.on("click", this.startScene, this);
},
startScene: function(t) {
switch (t.node.name) {
case "login_bt":
var o = this.name_input.string;
console.log("name:" + o);
if (o) {
var e = n("./util/NetControl");
console.log("开始连接");
e.connect();
console.log("连接完成");
cc.director.loadScene("hall");
}
}
}
});
cc._RF.pop();
}, {
"./util/NetControl": "NetControl"
} ],
NetConfig: [ function(n, t, o) {
"use strict";
cc._RF.push(t, "199e3DVZQVIzKw2kyqmc/TO", "NetConfig");
t.exports = {
host: "ws://192.168.2.35:8002/"
};
cc._RF.pop();
}, {} ],
NetControl: [ function(n, t, o) {
"use strict";
cc._RF.push(t, "178ben1Us9KMZOa5UbmVL53", "NetControl");
window.onfire = n("onfire");
var e = n("NetConfig"), i = {
_sock: {},
connect: function() {
if (1 !== this._sock.readyState) {
this._sock = new WebSocket(e.host);
this._sock.onopen = this._onOpen.bind(this);
this._sock.onclose = this._onClose.bind(this);
this._sock.onmessage = this._onMessage.bind(this);
}
return this;
},
_onOpen: function() {
onfire.fire("onopen");
},
_onClose: function(n) {
onfire.fire("onclose", n);
},
_onMessage: function(n) {
onfire.fire("onmessage", n);
},
send: function(n) {
this._sock.send(n);
console.log("send msg" + n);
}
};
t.exports = i;
cc._RF.pop();
}, {
NetConfig: "NetConfig",
onfire: "onfire"
} ],
hall: [ function(n, t, o) {
"use strict";
cc._RF.push(t, "7e886G/CrZCSZDxKi5HTSNh", "hall");
cc.Class({
extends: cc.Component,
properties: {
list_bt: cc.Button,
notice_bt: cc.Button,
create_bt: cc.Button,
single_bt: cc.Button,
double_bt: cc.Button,
set_bt: cc.Button,
out_bt: cc.Button
},
onLoad: function() {
this.out_bt.node.on("click", this.on_out_bt, this);
},
on_out_bt: function() {
cc.director.loadScene("index");
},
start: function() {}
});
cc._RF.pop();
}, {} ],
onfire: [ function(n, t, o) {
"use strict";
cc._RF.push(t, "53b80cUeIdI/7Jkp7lRtD0H", "onfire");
var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
return typeof n;
} : function(n) {
return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};
!function(n, o) {
"object" === ("undefined" == typeof t ? "undefined" : e(t)) && t.exports ? t.exports = o() : n.onfire = o();
}("undefined" != typeof window ? window : void 0, function() {
var n = {}, t = 0, o = "string", i = "function", c = Function.call.bind(Object.hasOwnProperty), r = Function.call.bind(Array.prototype.slice);
function u(r, u, s, f) {
if (("undefined" == typeof r ? "undefined" : e(r)) !== o || ("undefined" == typeof u ? "undefined" : e(u)) !== i) throw new Error("args: " + o + ", " + i);
c(n, r) || (n[r] = {});
n[r][++t] = [ u, s, f ];
return [ r, t ];
}
function s(n, t) {
for (var o in n) c(n, o) && t(o, n[o]);
}
function f(t, o) {
c(n, t) && s(n[t], function(e, i) {
i[0].apply(i[2], o);
i[1] && delete n[t][e];
});
}
return {
on: function(n, t, o) {
return u(n, t, 0, o);
},
one: function(n, t, o) {
return u(n, t, 1, o);
},
un: function(t) {
var r, u, f = !1, l = "undefined" == typeof t ? "undefined" : e(t);
if (l === o) {
if (c(n, t)) {
delete n[t];
return !0;
}
return !1;
}
if ("object" === l) {
r = t[0];
u = t[1];
if (c(n, r) && c(n[r], u)) {
delete n[r][u];
return !0;
}
return !1;
}
if (l === i) {
s(n, function(o, e) {
s(e, function(e, i) {
if (i[0] === t) {
delete n[o][e];
f = !0;
}
});
});
return f;
}
return !0;
},
fire: function(n) {
var t = r(arguments, 1);
setTimeout(function() {
f(n, t);
});
},
fireSync: function(n) {
f(n, r(arguments, 1));
},
clear: function() {
n = {};
}
};
});
cc._RF.pop();
}, {} ]
}, {}, [ "Index", "hall", "NetConfig", "NetControl", "onfire" ]);