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
        out_bt : cc.Button,
        voice_bt : cc.Button,
        talk_bt : cc.Button,
        ready_bt : cc.Button,
        no_ready_bt : cc.Button,
        play_bt : cc.Button,
        prefab_poker: {
            default: null,
            type: cc.Prefab
        },
        layout : cc.Layout,
        poker_up : cc.Sprite,
        poker_left : cc.Sprite,
        poker_down : cc.Sprite,
        poker_right : cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('room onLoad');

        this.util = require('./util/util');
        //绑定消息事件
        // this.msssageFire=onfire.on("onmessage",this.onMessage.bind(this));

        //设置当前能选几张牌
        this.curr_poker_num = 4;
        //当前选中的牌
        this.curr_poker = [];
         
         //按钮事件
        this.out_bt.node.on('click',this.on_out_bt,this);

        //加载扑克牌图片资源
        this.load_pokers();

    },
    //加载扑克牌资源
    load_pokers(){

        console.log('room load_pokers');

        var that = this;
        that.pokers = {};
        cc.loader.loadResDir('pokers', cc.SpriteFrame, function (err, ress) {
            for(var p of ress){
                that.pokers[p.name] = p;
            }
            that.setPokers();
        });
        console.log(that.pokers );

        
    },
    //设置显示的牌
    setPokers(){
        console.log('room setPokers');

        //设置当前玩家手中的牌
        var pokers = [414,413,412,411,410,409,408,407,406,405,404,403,402];
        for(var p of pokers){
            var pokersNode = cc.instantiate(this.prefab_poker);
            var img = pokersNode.getChildByName('img');
            img.getComponent(cc.Sprite).spriteFrame = this.pokers[p];
            img.poker = p;
            pokersNode.parent = this.layout.node;
            img.on(cc.Node.EventType.TOUCH_START, this.onPoker, this);
            img.on(cc.Node.EventType.TOUCH_MOVE, this.onPoker, this);
        }

        //设置每个玩家出的牌
        // var up_poker = 114;
        // var down_poker = 214;
        // var left_poker = 314;
        // var right_poker = 414;
        // this.poker_up.spriteFrame = this.pokers[up_poker];
        // this.poker_down.spriteFrame = this.pokers[down_poker];
        // this.poker_left.spriteFrame = this.pokers[left_poker];
        // this.poker_right.spriteFrame = this.pokers[right_poker];

    },
    //牌事件
    onPoker(event){
        console.log('room onPoker');


        // console.log(event);
        if(event.type == 'touchmove'){
            if(event.currentTarget.poker != event.target.poker){
                console.log("diff");
                console.log(currentTarget);
                console.log(target);
            }
            return 
        }
        console.log(event);
        //点击的节点
        var curr = event.currentTarget;
        //移动牌
        var p = curr.getPosition();
        if(p.y == 25){
            curr.setPosition(0,0);
            //删除取消的牌
            this.curr_poker = this.util.arrayDel(this.curr_poker, this.curr_poker.indexOf(curr) );
        }else{
            //根据选牌数删除多余的牌
            curr.setPosition(0,25);
            var num = this.curr_poker.push(curr);
            if(num > this.curr_poker_num){
                var rm_poker = this.curr_poker.shift();
                rm_poker.setPosition(0,0);
            }
        }
    },

    //退出按钮返回到大厅
    on_out_bt(){
        var netControl = require('./util/NetControl');
        var global = require('./global');

        netControl.send('{"method":"out","roomId":"'+global.table+'","sit":"'+global.sit+'","playerId":"'+global.name+'"}');
        cc.director.loadScene('hall');
    },

    onMessage:function(obj){
        console.log('room onMessage');
        console.log(obj);
        // onfire.clear();
    },

    start () {
        
    },

    // update (dt) {},
});
