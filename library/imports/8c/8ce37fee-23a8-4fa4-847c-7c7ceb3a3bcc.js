"use strict";
cc._RF.push(module, '8ce37/uI6hPpIR8fHzrOjvM', 'util');
// scripts/util/util.js

"use strict";

var util = {

    //删除数组的节点，返回新数组
    arrayDel: function arrayDel(arr, n) {
        if (n < 0) {
            return arr;
        } else {
            return arr.slice(0, n).concat(arr.slice(n + 1, arr.length));
        }
    },
    onmessage: function onmessage() {}

};

module.exports = util;

cc._RF.pop();