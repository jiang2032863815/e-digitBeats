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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
            this.tickThroughFlag = true;
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
            if (this.tickThroughFlag) {
                for (var i = this.__frameElements.front(); i != digitBeats.nil; i = i.nxt()) {
                    i.val.onUpdate();
                }
            }
            else {
                for (var i = this.__frameElements.back(); i != digitBeats.nil; i = i.pre()) {
                    i.val.onUpdate();
                }
            }
            this.tickThroughFlag = !this.tickThroughFlag;
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
var digitBeats;
(function (digitBeats) {
    var SceneManager = (function () {
        function SceneManager(mainContainer) {
            this.mainContainer = mainContainer;
            this.nowScene = digitBeats.nil;
            this.scenePool = {};
            this.onResourceGroupLoadedBinded = this.onResourceGroupLoaded.bind(this);
            mainContainer.removeChildren();
        }
        SceneManager.prototype.attachScene = function (id, scene, groupName, loadingScene) {
            if (loadingScene === void 0) { loadingScene = digitBeats.nil; }
            this.scenePool[id] = { scene: scene, loadingScene: loadingScene, groupName: groupName };
            scene.parentInterface.attachInterface(0 /* changeSceneWithInitData */, this.scene_interface_change_scene_with_init_data, this);
        };
        SceneManager.prototype.scene_interface_change_scene_with_init_data = function (id) {
            var d = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                d[_i - 1] = arguments[_i];
            }
            this.changeSceneWithInitData.apply(this, [id].concat(d));
        };
        SceneManager.prototype.onResourceGroupLoaded = function () {
            if (++this.__now_cnt >= this.__now_tot) {
                if (this.scenePool[this.__now_change_scene_id].loadingScene != digitBeats.nil) {
                    this.mainContainer.removeChild(this.scenePool[this.__now_change_scene_id].loadingScene);
                }
                (_a = this.nowScene).initWithData.apply(_a, this.__now_change_scene_data);
                this.mainContainer.addChild(this.nowScene);
            }
            var _a;
        };
        SceneManager.prototype.changeSceneWithInitData = function (id) {
            var d = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                d[_i - 1] = arguments[_i];
            }
            if (!this.scenePool[id]) {
                throw new Error("未找到该场景！！！");
            }
            if (this.nowScene != digitBeats.nil) {
                this.mainContainer.removeChild(this.nowScene);
            }
            this.__now_change_scene_id = id;
            var groups = this.scenePool[id].groupName;
            this.__now_tot = 0;
            for (var i = 0; i < groups.length; i++) {
                if (RES.isGroupLoaded(groups[i]))
                    continue;
                this.__now_tot++;
            }
            this.nowScene = this.scenePool[id].scene;
            if (this.__now_tot == 0) {
                (_a = this.nowScene).initWithData.apply(_a, d);
                this.mainContainer.addChild(this.nowScene);
            }
            else {
                if (this.scenePool[id].loadingScene != digitBeats.nil) {
                    this.mainContainer.addChild(this.scenePool[id].loadingScene);
                    var groupItems = [];
                    for (var i = 0; i < groups.length; i++) {
                        if (RES.isGroupLoaded(groups[i]))
                            continue;
                        groupItems.push(RES.getGroupByName(groups[i]));
                    }
                    this.scenePool[id].loadingScene.onBeforeLoad(groupItems);
                }
                this.__now_cnt = 0;
                for (var _b = 0, groups_1 = groups; _b < groups_1.length; _b++) {
                    var v = groups_1[_b];
                    if (RES.isGroupLoaded(v))
                        continue;
                    if (this.scenePool[id].loadingScene != digitBeats.nil) {
                        RES.loadGroup(v, 0, this.scenePool[id].loadingScene).then(this.onResourceGroupLoadedBinded);
                    }
                    else {
                        RES.loadGroup(v, 0).then(this.onResourceGroupLoadedBinded);
                    }
                }
            }
            var _a;
        };
        return SceneManager;
    }());
    digitBeats.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "digitBeats.SceneManager");
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    var LoadingScene = (function (_super) {
        __extends(LoadingScene, _super);
        function LoadingScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoadingScene.prototype.onBeforeLoad = function (groups) { };
        LoadingScene.prototype.onProgress = function (cur, total) { };
        return LoadingScene;
    }(digitBeats.Component));
    digitBeats.LoadingScene = LoadingScene;
    __reflect(LoadingScene.prototype, "digitBeats.LoadingScene");
})(digitBeats || (digitBeats = {}));
var digitBeats;
(function (digitBeats) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(globalHandle) {
            if (globalHandle === void 0) { globalHandle = digitBeats.nil; }
            var _this = _super.call(this) || this;
            _this.globalHandle = globalHandle;
            return _this;
        }
        Scene.prototype.initWithData = function () {
            var d = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                d[_i] = arguments[_i];
            }
        };
        Scene.prototype.loadBeforeInStage = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        Scene.prototype.changeSceneWithInitData = function (id) {
            var d = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                d[_i - 1] = arguments[_i];
            }
            (_a = this.parentInterface).call.apply(_a, [0 /* changeSceneWithInitData */, id].concat(d));
            var _a;
        };
        return Scene;
    }(digitBeats.Component));
    digitBeats.Scene = Scene;
    __reflect(Scene.prototype, "digitBeats.Scene");
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
