var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var digitBeats;
(function (digitBeats) {
    digitBeats.nil = null;
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    var Node = (function () {
        function Node() {
            this.__pre = digitBeats.nil;
            this.__nxt = digitBeats.nil;
            /**
             * @return 当前节点的值
             */
            this.val = digitBeats.nil;
        }
        /**
         * @return 当前节点的后继节点
         */
        Node.prototype.nxt = function () {
            return this.__nxt;
        };
        /**
         * @return 当前节点的前驱节点
         */
        Node.prototype.pre = function () {
            return this.__pre;
        };
        /**
         * 设置后继节点
         * @param v 后继节点
         */
        Node.prototype.setNxt = function (v) {
            this.__nxt = v;
        };
        /**
         * 设置前驱节点
         * @param v 前驱节点
         */
        Node.prototype.setPre = function (v) {
            this.__pre = v;
        };
        /**
         * 设置节点的值
         * @param v 节点的值
         */
        Node.prototype.setVal = function (v) {
            this.val = v;
        };
        return Node;
    }());
    digitBeats.Node = Node;
    __reflect(Node.prototype, "digitBeats.Node");
    var LinkList = (function () {
        function LinkList() {
            this.__head = digitBeats.nil;
            this.__tail = digitBeats.nil;
        }
        /**
         * 往链表尾端接上一个节点
         * @param val 该节点的值
         * @return 返回该节点
         */
        LinkList.prototype.pushBack = function (val) {
            var nd = new Node();
            nd.setVal(val);
            if (this.__head == digitBeats.nil) {
                this.__head = this.__tail = nd;
            }
            else {
                this.__tail.setNxt(nd);
                nd.setPre(this.__tail);
                this.__tail = nd;
            }
            return nd;
        };
        /**
         * 往链表首端接上一个节点
         * @param val 该节点的值
         * @return 返回该节点
         */
        LinkList.prototype.pushFront = function (val) {
            var nd = new Node();
            nd.setVal(val);
            if (this.__head == digitBeats.nil) {
                this.__head = this.__tail = nd;
            }
            else {
                this.__head.setPre(nd);
                nd.setNxt(this.__head);
                this.__head = nd;
            }
            return nd;
        };
        /**
         * 从链表中删除一个节点
         * @param nd 即将被删除的节点
         */
        LinkList.prototype.removeNode = function (nd) {
            if (nd == digitBeats.nil)
                return;
            if (this.__head == nd) {
                this.__head = this.__head.nxt();
                if (this.__head != digitBeats.nil) {
                    this.__head.setPre(digitBeats.nil);
                }
            }
            else if (this.__tail == nd) {
                this.__tail = this.__tail.pre();
                if (this.__tail != digitBeats.nil) {
                    this.__tail.setNxt(digitBeats.nil);
                }
            }
            else {
                if (digitBeats.__isDebugMode) {
                    if (nd.pre() == digitBeats.nil || nd.nxt() == digitBeats.nil) {
                        throw new Error("双向链表节点删除错误");
                    }
                }
                nd.pre().setNxt(nd.nxt());
                nd.nxt().setPre(nd.pre());
            }
        };
        /**
         * @return 返回链表的头节点
         */
        LinkList.prototype.front = function () {
            return this.__head;
        };
        /**
         * @return 返回链表的尾结点
         */
        LinkList.prototype.back = function () {
            return this.__tail;
        };
        /**
         * @return 返回当前链表是否为空
         */
        LinkList.prototype.isEmpty = function () {
            return this.__head == digitBeats.nil;
        };
        /**
         * 把当前节点到链表尾端部分整体移动到链表首端
         * @param e 当前节点
         */
        LinkList.prototype.moveLinkToFront = function (e) {
            if (e == digitBeats.nil || e == this.__head)
                return;
            if (this.__head == this.__tail)
                return;
            e.pre().setNxt(digitBeats.nil);
            this.__tail.setNxt(this.__head);
            this.__head.setPre(this.__tail);
            this.__head = e;
            this.__tail = e.pre();
            e.setPre(digitBeats.nil);
        };
        return LinkList;
    }());
    digitBeats.LinkList = LinkList;
    __reflect(LinkList.prototype, "digitBeats.LinkList");
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    var FrameManager = (function () {
        function FrameManager() {
            this.__frameElements = new digitBeats.LinkList();
            this.__elementMap = {};
            egret.startTick(this.__onTick, this);
        }
        FrameManager.prototype.addToFrameSystem = function (c) {
            var t = this.__frameElements.pushBack(c);
            this.__elementMap[c.__ruixueCode] = t;
            return t;
        };
        FrameManager.prototype.removeFromFrameSystem = function (c) {
            var t = this.__elementMap[c.__ruixueCode];
            if (!t)
                return;
            delete this.__elementMap[c.__ruixueCode];
            this.__frameElements.removeNode(t);
        };
        FrameManager.prototype.__onTick = function () {
            for (var i = this.__frameElements.front(); i != digitBeats.nil; i = i.nxt()) {
                i.val.onUpdate();
            }
            return false;
        };
        return FrameManager;
    }());
    __reflect(FrameManager.prototype, "FrameManager");
    var rxCode = 0;
    var fManager = new FrameManager();
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            var _this = _super.call(this) || this;
            _this.__isInFrameManager = false;
            _this.parentInterface = new digitBeats.InterfaceManager();
            _this.__ruixueCode = ++rxCode;
            _this.onStart();
            _this.__onNew();
            return _this;
        }
        /**
         * 创建组件，优先从对象池中获取
         * @param constructorName 继承自ruixue.Component的类的类名
         * @return 所创建的组建
         */
        Component.createComponent = function (constructorName) {
            if (!this.__cycleManagers[constructorName.ConstructorName]) {
                this.__cycleManagers[constructorName.ConstructorName] = new digitBeats.CycleManager(constructorName);
            }
            var t = this.__cycleManagers[constructorName.ConstructorName].create();
            return t;
        };
        /**
         * 释放组建对象到对象池中
         * @param constructorName 继承自ruixue.Component的类的类名
         * @param obj 即将被释放的对象
         */
        Component.releaseComponent = function (constructorName, obj) {
            if (!this.__cycleManagers[constructorName.ConstructorName]) {
                this.__cycleManagers[constructorName.ConstructorName] = new digitBeats.CycleManager(constructorName);
            }
            obj.parentInterface.clearInterfaces();
            obj.removeEventListener(egret.Event.ADDED_TO_STAGE, obj.__onAddToStage, obj);
            obj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, obj.__onRemovedFromStage, obj);
            if (obj.__isInFrameManager) {
                fManager.removeFromFrameSystem(obj);
                obj.__isInFrameManager = false;
            }
            this.__cycleManagers[constructorName.ConstructorName].release(obj);
        };
        Component.prototype.__onAddToStage = function () {
            this.onAddToStage();
            fManager.addToFrameSystem(this);
            this.__isInFrameManager = true;
        };
        Component.prototype.__onRemovedFromStage = function () {
            fManager.removeFromFrameSystem(this);
            this.__isInFrameManager = false;
            this.onRemovedFromStage();
        };
        Component.prototype.__onNew = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.__onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__onRemovedFromStage, this);
        };
        /**
         * 当组件开始生命周期（整个生命周期只会调用一次）
         */
        Component.prototype.onStart = function () {
        };
        /**
         * 当组件被对象池回收导致结束生命周期（整个生命周期只会调用一次）
         */
        Component.prototype.onEnd = function () {
        };
        /**
         * 当进入下一帧
         */
        Component.prototype.onUpdate = function () {
        };
        /**
         * 当组件被添加到舞台上
         */
        Component.prototype.onAddToStage = function () {
        };
        /**
         * 当组件从舞台中移除
         */
        Component.prototype.onRemovedFromStage = function () {
        };
        Component.__cycleManagers = {};
        return Component;
    }(eui.Component));
    digitBeats.Component = Component;
    __reflect(Component.prototype, "digitBeats.Component", ["digitBeats.ICycleObject"]);
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    var CycleManager = (function () {
        function CycleManager(constructorName) {
            this.constructorName = constructorName;
            this.source = [];
        }
        /**
         * 从对象池中获取一个对象
         */
        CycleManager.prototype.create = function () {
            if (this.source.length > 0) {
                var d = this.source.pop();
                d.onStart();
                d.__onNew();
                return d;
            }
            else {
                var d = new this.constructorName();
                return d;
            }
        };
        /**
         * 释放一个对象到对象池
         */
        CycleManager.prototype.release = function (d) {
            d.onEnd();
            this.source.push(d);
        };
        return CycleManager;
    }());
    digitBeats.CycleManager = CycleManager;
    __reflect(CycleManager.prototype, "digitBeats.CycleManager");
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    var InterfaceManager = (function () {
        function InterfaceManager() {
            this.__interfaces = {};
        }
        /**
         * 注册一个接口供子组件调用
         * @param name 接口名
         * @param callFunc 接口函数
         * @param thisObject 调用接口函数的this上下文
         */
        InterfaceManager.prototype.attachInterface = function (name, callFunc, thisObject) {
            this.__interfaces[name] = { callFunc: callFunc, thisObject: thisObject };
        };
        /**
         * 调用接口
         * @param name 接口名
         * @param args 参数列表
         * @return 接口返回值
         */
        InterfaceManager.prototype.call = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (digitBeats.__isDebugMode) {
                if (!this.__interfaces[name]) {
                    throw new Error("未注册该接口");
                }
            }
            var d = this.__interfaces[name];
            return (_a = d.callFunc).call.apply(_a, [d.thisObject].concat(args));
            var _a;
        };
        /**
         * 清除所有接口
         */
        InterfaceManager.prototype.clearInterfaces = function () {
            this.__interfaces = {};
        };
        return InterfaceManager;
    }());
    digitBeats.InterfaceManager = InterfaceManager;
    __reflect(InterfaceManager.prototype, "digitBeats.InterfaceManager");
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    /**
     * 克隆一个对象
     * @param obj 要克隆的对象
     */
    function cloneObject(obj) {
        if (obj == undefined || obj == digitBeats.nil)
            return digitBeats.nil;
        var ret;
        if (obj instanceof Array) {
            ret = [];
        }
        else if (obj instanceof Object) {
            ret = new Object();
        }
        else {
            return ret;
        }
        for (var i in obj) {
            if (obj[i] instanceof Object) {
                ret[i] = cloneObject(obj[i]);
            }
            else {
                ret[i] = obj[i];
            }
        }
        return ret;
    }
    digitBeats.cloneObject = cloneObject;
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    digitBeats.__isDebugMode = true;
    /**
     * 设置当前运行模式
     * @param flag 运行的模式（true：debug模式，false:生产环境模式）
     */
    function modeDebug(flag) {
        digitBeats.__isDebugMode = flag;
    }
    digitBeats.modeDebug = modeDebug;
})(digitBeats || (digitBeats = {}));
