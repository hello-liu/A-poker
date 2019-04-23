(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/util/util.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8ce37/uI6hPpIR8fHzrOjvM', 'util', __filename);
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
        //# sourceMappingURL=util.js.map
        