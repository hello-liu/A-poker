window.__require=function t(e,o,n){function i(c,a){if(!o[c]){if(!e[c]){var l=c.split("/");if(l=l[l.length-1],!e[l]){var r="function"==typeof __require&&__require;if(!a&&r)return r(l,!0);if(s)return s(l,!0);throw new Error("Cannot find module '"+c+"'")}}var _=o[c]={exports:{}};e[c][0].call(_.exports,function(t){return i(e[c][1][t]||t)},_,_.exports,t,e,o,n)}return o[c].exports}for(var s="function"==typeof __require&&__require,c=0;c<n.length;c++)i(n[c]);return i}({Index:[function(t,e,o){"use strict";cc._RF.push(e,"145e2ty02xOr7IYZoUiK9uW","Index"),cc.Class({extends:cc.Component,properties:{name_input:cc.EditBox,login_bt:cc.Button,wx_login_bt:cc.Button,login_tip_lb:cc.Label},onLoad:function(){this.login_bt.node.on("click",this.startScene,this),this.wx_login_bt.node.on("click",this.startScene,this),cc.director.preloadScene("hall")},onOpen:function(){var e=t("./global");t("./util/NetControl").send(' {"method":"iam","name":"'+e.name+'"} '),cc.director.loadScene("hall")},startScene:function(e){switch(e.node.name){case"login_bt":var o=this.name_input.string;if(console.log("name:"+o),o){var n=t("./global"),i=t("./util/NetControl");i.connect(),i.bind_event("open",this.onOpen),n.name=o,n.id=o,this.login_tip_lb.string="\u7f51\u7edc\u8fde\u63a5\u4e2d\u3002\u3002\u3002"}else this.login_tip_lb.string="\u8bf7\u8f93\u5165\u7528\u6237\u540d\uff01"}}}),cc._RF.pop()},{"./global":"global","./util/NetControl":"NetControl"}],NetConfig:[function(t,e,o){"use strict";cc._RF.push(e,"199e3DVZQVIzKw2kyqmc/TO","NetConfig"),e.exports={host:"ws://192.168.2.35:8002/"},cc._RF.pop()},{}],NetControl:[function(t,e,o){"use strict";cc._RF.push(e,"178ben1Us9KMZOa5UbmVL53","NetControl");var n=t("NetConfig"),i={_sock:{},events_open:[],connect:function(){return 1!==this._sock.readyState&&(this._sock=new WebSocket(n.host),this._sock.onmessage=this.onmessage,this._sock.onclose=this.onclose,this._sock.onopen=this.onopen),this},send:function(t){this._sock.send(t),console.log("send msg"+t)},close:function(){console.log("_sock close"),this._sock.close()},onclose:function(t){console.log("_sock onclose")},onopen:function(t){console.log("_sock onopen")},onmessage:function(t){console.log("_sock onmessage")},bind_event:function(t,e,o){"open"==t?this._sock.onopen=e:"close"==t?this._sock.onclose=e:"message"==t&&(this._sock.onmessage=e.bind(o))}};e.exports=i,cc._RF.pop()},{NetConfig:"NetConfig"}],global:[function(t,e,o){"use strict";cc._RF.push(e,"5ecddaVKRNLQ5jFn0jjHj/j","global"),e.exports={name:"",data:{}},cc._RF.pop()},{}],hall:[function(t,e,o){"use strict";cc._RF.push(e,"7e886G/CrZCSZDxKi5HTSNh","hall"),cc.Class(function(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}({extends:cc.Component,properties:{prefab_table_1v1:{default:null,type:cc.Prefab},prefab_table_2v2:{default:null,type:cc.Prefab},content:{default:null,type:cc.Node},list_bt:cc.Button,notice_bt:cc.Button,create_bt:cc.Button,single_bt:cc.Button,double_bt:cc.Button,set_bt:cc.Button,out_bt:cc.Button,list_page:cc.Node,notice_page:cc.Node,create_page:cc.Node,single_page:cc.Node,double_page:cc.Node,set_page:cc.Node},update:function(){},onMessage:function(t){var e=JSON.parse(t.data);if(console.log(e),e&&e.table)cc.director.loadScene("room");else if(e&&e.tables){var o=!0,n=!1,i=void 0;try{for(var s,c=e.tables[Symbol.iterator]();!(o=(s=c.next()).done);o=!0){var a,l=s.value,r=l.id;if(l.player_up){if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_up/Background/Label"))a.getComponent(cc.Label).string=l.player_up.name}else if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_up/Background/Label"))a.getComponent(cc.Label).string="\u52a0\u5165";if(l.player_down){if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_down/Background/Label"))a.getComponent(cc.Label).string=l.player_down.name}else if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_down/Background/Label"))a.getComponent(cc.Label).string="\u52a0\u5165";if(l.player_left){if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_left/Background/Label"))a.getComponent(cc.Label).string=l.player_left.name}else if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_left/Background/Label"))a.getComponent(cc.Label).string="\u52a0\u5165";if(l.player_right){if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_right/Background/Label"))a.getComponent(cc.Label).string=l.player_right.name}else if(a=cc.find("Canvas/rooms/view/content/"+r+"/sit_right/Background/Label"))a.getComponent(cc.Label).string="\u52a0\u5165"}}catch(t){n=!0,i=t}finally{try{!o&&c.return&&c.return()}finally{if(n)throw i}}}else;},onLoad:function(){this.global=t("./global"),this.netControl=t("./util/NetControl"),this.netControl.bind_event("message",this.onMessage,this),this.scheduleOnce(function(){this.init_table(),this.netControl.send('{"method":"tables"}'),this.init_table_position()},0),this.out_bt.node.on("click",this.on_out_bt,this),this.list_bt.node.on("click",this.onPage,this),this.list_page.on(cc.Node.EventType.TOUCH_START,this.onPage,this),this.list_page.mv="stop_up",this.notice_bt.node.on("click",this.onPage,this),this.notice_page.on(cc.Node.EventType.TOUCH_START,this.onPage,this),this.notice_page.mv="stop_up",this.create_bt.node.on("click",this.onPage,this),this.create_page.on(cc.Node.EventType.TOUCH_START,this.onPage,this),this.create_page.mv="stop_up",this.single_bt.node.on("click",this.onPage,this),this.single_page.on(cc.Node.EventType.TOUCH_START,this.onPage,this),this.single_page.mv="stop_up",this.double_bt.node.on("click",this.onPage,this),this.double_page.on(cc.Node.EventType.TOUCH_START,this.onPage,this),this.double_page.mv="stop_up",this.set_bt.node.on("click",this.onPage,this),this.set_page.on(cc.Node.EventType.TOUCH_START,this.onPage,this),this.set_page.mv="stop_up",cc.director.preloadScene("hall")},onPage:function(t){var e=t.target;e==this.list_bt.node?e=this.list_page:e==this.notice_bt.node?e=this.notice_page:e==this.create_bt.node?e=this.create_page:e==this.single_bt.node?e=this.single_page:e==this.double_bt.node?e=this.double_page:e==this.set_bt.node&&(e=this.set_page),"stop_up"==e.mv?e.mv="mv_down":"mv_down"==e.mv?e.mv="mv_up":"mv_up"==e.mv?e.mv="mv_down":"stop_down"==e.mv?e.mv="mv_up":e.mv="mv_down"},init_table_position:function(){for(var t=0;t<3;t++)for(var e=0;e<1;e++){var o="table_1v1_"+(3*e+t);(n=cc.find("Canvas/rooms/view/content/"+o)).setPosition(n.x+350*t-350,n.y-350*e-200)}for(t=0;t<3;t++)for(e=0;e<3;e++){var n;o="table_2v2_"+(3*e+t);(n=cc.find("Canvas/rooms/view/content/"+o)).setPosition(n.x+350*t-350,n.y-350*e-350-200)}},init_table:function(){for(var t=0;t<3;t++)for(var e=0;e<1;e++){(o=cc.instantiate(this.prefab_table_1v1)).name="table_1v1_"+(3*e+t),o.getChildByName("name").getComponent(cc.Label).string="1v1_"+(3*e+t),o.parent=this.content}for(t=0;t<3;t++)for(e=0;e<3;e++){var o;(o=cc.instantiate(this.prefab_table_2v2)).name="table_2v2_"+(3*e+t),o.getChildByName("name").getComponent(cc.Label).string="2v2_"+(3*e+t),o.parent=this.content}},on_out_bt:function(){t("./util/NetControl").close(),cc.director.loadScene("index")},start:function(){}},"update",function(t){"mv_up"==this.list_page.mv?this.list_page.y+=20:"mv_down"==this.list_page.mv&&(this.list_page.y-=20),this.list_page.y<0?this.list_page.mv="stop_down":this.list_page.y>755&&(this.list_page.mv="stop_up"),"mv_up"==this.notice_page.mv?this.notice_page.y+=20:"mv_down"==this.notice_page.mv&&(this.notice_page.y-=20),this.notice_page.y<0?this.notice_page.mv="stop_down":this.notice_page.y>755&&(this.notice_page.mv="stop_up"),"mv_up"==this.create_page.mv?this.create_page.y+=20:"mv_down"==this.create_page.mv&&(this.create_page.y-=20),this.create_page.y<0?this.create_page.mv="stop_down":this.create_page.y>755&&(this.create_page.mv="stop_up"),"mv_up"==this.single_page.mv?this.single_page.y+=20:"mv_down"==this.single_page.mv&&(this.single_page.y-=20),this.single_page.y<0?this.single_page.mv="stop_down":this.single_page.y>755&&(this.single_page.mv="stop_up"),"mv_up"==this.double_page.mv?this.double_page.y+=20:"mv_down"==this.double_page.mv&&(this.double_page.y-=20),this.double_page.y<0?this.double_page.mv="stop_down":this.double_page.y>755&&(this.double_page.mv="stop_up"),"mv_up"==this.set_page.mv?this.set_page.y+=20:"mv_down"==this.set_page.mv&&(this.set_page.y-=20),this.set_page.y<0?this.set_page.mv="stop_down":this.set_page.y>755&&(this.set_page.mv="stop_up")})),cc._RF.pop()},{"./global":"global","./util/NetControl":"NetControl"}],onfire:[function(t,e,o){"use strict";cc._RF.push(e,"53b80cUeIdI/7Jkp7lRtD0H","onfire");var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t,o){"object"===(void 0===e?"undefined":n(e))&&e.exports?e.exports=o():t.onfire=o()}("undefined"!=typeof window?window:void 0,function(){var t={},e=0,o="string",i="function",s=Function.call.bind(Object.hasOwnProperty),c=Function.call.bind(Array.prototype.slice);function a(c,a,l,r){if((void 0===c?"undefined":n(c))!==o||(void 0===a?"undefined":n(a))!==i)throw new Error("args: "+o+", "+i);return s(t,c)||(t[c]={}),t[c][++e]=[a,l,r],[c,e]}function l(t,e){for(var o in t)s(t,o)&&e(o,t[o])}function r(e,o){s(t,e)&&l(t[e],function(n,i){i[0].apply(i[2],o),i[1]&&delete t[e][n]})}return{on:function(t,e,o){return a(t,e,0,o)},one:function(t,e,o){return a(t,e,1,o)},un:function(e){var c,a,r=!1,_=void 0===e?"undefined":n(e);return _===o?!!s(t,e)&&(delete t[e],!0):"object"===_?(c=e[0],a=e[1],!(!s(t,c)||!s(t[c],a)||(delete t[c][a],0))):_!==i||(l(t,function(o,n){l(n,function(n,i){i[0]===e&&(delete t[o][n],r=!0)})}),r)},fire:function(t){var e=c(arguments,1);setTimeout(function(){r(t,e)})},fireSync:function(t){r(t,c(arguments,1))},clear:function(){t={}}}}),cc._RF.pop()},{}],room:[function(t,e,o){"use strict";cc._RF.push(e,"797eb4g2slKxa6/knbeAttf","room"),cc.Class({extends:cc.Component,properties:{out_bt:cc.Button,voice_bt:cc.Button,talk_bt:cc.Button,ready_bt:cc.Button,no_ready_bt:cc.Button,play_bt:cc.Button,prefab_poker:cc.Prefab,prefab_call_btn:cc.Prefab,pokers_layout:cc.Layout,call_layout:cc.Layout,call_node:cc.Node,poker_up:cc.Sprite,poker_left:cc.Sprite,poker_down:cc.Sprite,poker_right:cc.Sprite,up_lable:cc.Label,left_lable:cc.Label,right_lable:cc.Label},onLoad:function(){console.log("room onLoad"),this.global=t("./global"),this.netControl=t("./util/NetControl"),this.netControl.bind_event("message",this.onMessage,this),this.util=t("./util/util"),this.curr_poker_num=1,this.curr_poker=[],this.out_bt.node.on("click",this.on_out_bt,this),this.ready_bt.node.on("click",this.on_ready_bt,this),this.no_ready_bt.node.on("click",this.on_no_ready_bt,this),this.load_pokers()},on_ready_bt:function(){this.netControl.send('{"method":"ready","roomId":"'+this.global.table+'","sit":"'+this.global.sit+'","playerId":"'+this.global.id+'"}')},on_no_ready_bt:function(){this.netControl.send('{"method":"noReady","roomId":"'+this.global.table+'","sit":"'+this.global.sit+'","playerId":"'+this.global.id+'"}')},load_pokers:function(){console.log("room load_pokers");var t=this;t.pokers={},cc.loader.loadResDir("pokers",cc.SpriteFrame,function(e,o){var n=!0,i=!1,s=void 0;try{for(var c,a=o[Symbol.iterator]();!(n=(c=a.next()).done);n=!0){var l=c.value;t.pokers[l.name]=l}}catch(e){i=!0,s=e}finally{try{!n&&a.return&&a.return()}finally{if(i)throw s}}t.netControl.send('{"method":"table","roomId":"'+t.global.table+'"}')}),console.log(t.pokers)},onPoker:function(t){if(console.log("room onPoker"),"touchmove"!=t.type){var e=t.currentTarget;if(25==e.getPosition().y)e.setPosition(0,0),this.curr_poker=this.util.arrayDel(this.curr_poker,this.curr_poker.indexOf(e));else if(e.setPosition(0,25),this.curr_poker.push(e)>this.curr_poker_num)this.curr_poker.shift().setPosition(0,0)}else t.currentTarget.poker!=t.target.poker&&(console.log("diff"),console.log(currentTarget),console.log(target))},on_out_bt:function(){var e=t("./util/NetControl"),o=t("./global");e.send('{"method":"out","roomId":"'+o.table+'","sit":"'+o.sit+'","playerId":"'+o.name+'"}'),cc.director.loadScene("hall")},onMessage:function(t){console.log("room onMessage"),console.log(t.data);var e=JSON.parse(t.data);e&&e.table&&this.set_table(e)},set_table:function(t){console.log(t);var e=this.global.sit,o=[414,413,412,411,410,409,408,407,406,405,404,403,402];if("wait"!=t.statu&&(o=t["player_"+e].pokers),o){this.pokers_layout.node.removeAllChildren();var n=!0,i=!1,s=void 0;try{for(var c,a=o[Symbol.iterator]();!(n=(c=a.next()).done);n=!0){var l=c.value,r=cc.instantiate(this.prefab_poker),_=r.getChildByName("img");_.getComponent(cc.Sprite).spriteFrame=this.pokers[l],_.poker=l,r.parent=this.pokers_layout.node,_.on(cc.Node.EventType.TOUCH_START,this.onPoker,this),_.on(cc.Node.EventType.TOUCH_MOVE,this.onPoker,this)}}catch(t){i=!0,s=t}finally{try{!n&&a.return&&a.return()}finally{if(i)throw s}}}e=this.global.sit;var p=["up","left","down","right"],u=p.indexOf(e),h=u+1>=p.length?u+1-p.length:u+1,g=p[h],d=p[h=u+2>=p.length?u+2-p.length:u+2],b=p[h=u+3>=p.length?u+3-p.length:u+3],f=t["player_"+d],m=t["player_"+b],v=t["player_"+g];if(this.up_lable.string=f?f.name:"",this.left_lable.string=m?m.name:"",this.right_lable.string=v?v.name:"","call"==t.statu&&t.currentplayer==e){this.call_node.y=0;var y=t.currentCall;1==y&&(y=0);for(var C=y+5;C<=100;C+=5){var k=cc.instantiate(this.prefab_call_btn);k.parent=this.call_layout.node,k.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string=C,k.on(cc.Node.EventType.TOUCH_START,this.onCall,this)}}else this.call_node.y=750},onCall:function(){console.log("onCall")},start:function(){}}),cc._RF.pop()},{"./global":"global","./util/NetControl":"NetControl","./util/util":"util"}],table_1v1:[function(t,e,o){"use strict";cc._RF.push(e,"d7c0cH+Sl9D3abi9JwfdXmo","table_1v1"),cc.Class({extends:cc.Component,properties:{sit_up_lable:cc.Label,sit_down_lable:cc.Label,up_bt:cc.Button,down_bt:cc.Button},onLoad:function(){this.global=t("./global"),this.netControl=t("./util/NetControl"),this.up_bt.node.on("click",this.on_up_bt,this),this.down_bt.node.on("click",this.on_down_bt,this)},onMessage:function(t){var e=t.data;e&&"hall"!=e.code&&(console.log(e),onfire.clear())},on_up_bt:function(){console.log("on_up_bt");var t=this.node.name,e=this.global.name;this.global.table=t,this.global.sit="up",this.netControl.send('{"method":"in","roomId":"'+t+'","sit":"up","type":"1v1","playerId":"'+e+'","playerName":"'+e+'"}')},on_down_bt:function(){console.log("on_down_bt");var t=this.node.name,e=this.global.name;this.global.table=t,this.global.sit="down",this.netControl.send('{"method":"in","roomId":"'+t+'","sit":"down","type":"1v1","playerId":"'+e+'","playerName":"'+e+'"}')},start:function(){}}),cc._RF.pop()},{"./global":"global","./util/NetControl":"NetControl"}],util:[function(t,e,o){"use strict";cc._RF.push(e,"8ce37/uI6hPpIR8fHzrOjvM","util");e.exports={arrayDel:function(t,e){return e<0?t:t.slice(0,e).concat(t.slice(e+1,t.length))},onmessage:function(){}},cc._RF.pop()},{}]},{},["Index","global","hall","room","table_1v1","NetConfig","NetControl","onfire","util"]);