

var util={

    //删除数组的节点，返回新数组
    arrayDel : function(arr,n){　
        if(n<0){
            return arr;
        }else{
        　　return arr.slice(0,n).concat(arr.slice(n+1,arr.length));
        }
    },
    onmessage:function(){
    },

};

module.exports=util;