/**
 * Created by Administrator on 2018/4/17 0017.
 */
//定义全局的变量
window.onfire=require("onfire");           //处理事件的类库
var netConfig=require('NetConfig');
var NetControl={
    _sock:{},  //当前的webSocket的对象
    connect: function () {
        if(this._sock.readyState!==1){
            //当前接口没有打开
            //重新连接
            this._sock = new WebSocket(netConfig.host);
            this._sock.onopen = this._onOpen.bind(this);
            this._sock.onclose = this._onClose.bind(this);
            this._sock.onmessage = this._onMessage.bind(this);
        }
        return this;
    },

    _onOpen:function(){
        onfire.fire("onopen");
    },
    _onClose:function(err){
        onfire.fire("onclose",err);
    },
    _onMessage:function(obj){

        onfire.fire("onmessage",obj);
    },

    send:function(msg){
        this._sock.send(msg);
        console.log("send msg"+msg);
    },
    close:function(){
        this._sock.close();
        console.log("_sock close");
    },
    onmessage:function(f){
        this._sock.onmessage(f);
    },

};

module.exports=NetControl;