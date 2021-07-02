declare namespace digitBeats {
    const nil: any;
}
declare namespace digitBeats {
    class Node<T> {
        private __pre;
        private __nxt;
        /**
         * @return 当前节点的值
         */
        val: T;
        /**
         * @return 当前节点的后继节点
         */
        nxt(): Node<T>;
        /**
         * @return 当前节点的前驱节点
         */
        pre(): Node<T>;
        /**
         * 设置后继节点
         * @param v 后继节点
         */
        setNxt(v: Node<T>): void;
        /**
         * 设置前驱节点
         * @param v 前驱节点
         */
        setPre(v: Node<T>): void;
        /**
         * 设置节点的值
         * @param v 节点的值
         */
        setVal(v: T): void;
    }
    class LinkList<T> {
        private __head;
        private __tail;
        /**
         * 往链表尾端接上一个节点
         * @param val 该节点的值
         * @return 返回该节点
         */
        pushBack(val: T): Node<T>;
        /**
         * 往链表首端接上一个节点
         * @param val 该节点的值
         * @return 返回该节点
         */
        pushFront(val: T): Node<T>;
        /**
         * 从链表中删除一个节点
         * @param nd 即将被删除的节点
         */
        removeNode(nd: Node<T>): void;
        /**
         * @return 返回链表的头节点
         */
        front(): Node<T>;
        /**
         * @return 返回链表的尾结点
         */
        back(): Node<T>;
        /**
         * @return 返回当前链表是否为空
         */
        isEmpty(): boolean;
        /**
         * 把当前节点到链表尾端部分整体移动到链表首端
         * @param e 当前节点
         */
        moveLinkToFront(e: Node<T>): void;
    }
}
declare namespace digitBeats {
    abstract class Component extends eui.Component implements ICycleObject {
        private static __cycleManagers;
        /**
         * 创建组件，优先从对象池中获取
         * @param constructorName 继承自ruixue.Component的类的类名
         * @return 所创建的组建
         */
        static createComponent<T extends Component>(constructorName: IComponentConstructor): T;
        /**
         * 释放组建对象到对象池中
         * @param constructorName 继承自ruixue.Component的类的类名
         * @param obj 即将被释放的对象
         */
        static releaseComponent<T extends Component>(constructorName: IComponentConstructor, obj: T): void;
        __ruixueCode: number;
        __isInFrameManager: boolean;
        __onAddToStage(): void;
        __onRemovedFromStage(): void;
        parentInterface: InterfaceManager;
        constructor();
        __onNew(): void;
        /**
         * 当组件开始生命周期（整个生命周期只会调用一次）
         */
        onStart(): void;
        /**
         * 当组件被对象池回收导致结束生命周期（整个生命周期只会调用一次）
         */
        onEnd(): void;
        /**
         * 当进入下一帧
         */
        onUpdate(): void;
        /**
         * 当组件被添加到舞台上
         */
        onAddToStage(): void;
        /**
         * 当组件从舞台中移除
         */
        onRemovedFromStage(): void;
    }
}
declare namespace digitBeats {
    class CycleManager<T extends ICycleObject> {
        private constructorName;
        private source;
        constructor(constructorName: IComponentConstructor);
        /**
         * 从对象池中获取一个对象
         */
        create(): T;
        /**
         * 释放一个对象到对象池
         */
        release(d: T): void;
    }
}
declare namespace digitBeats {
    interface ICycleObject {
        onStart(): void;
        onEnd(): void;
        __onNew(): void;
    }
}
declare namespace digitBeats {
    class InterfaceManager {
        private __interfaces;
        /**
         * 注册一个接口供子组件调用
         * @param name 接口名
         * @param callFunc 接口函数
         * @param thisObject 调用接口函数的this上下文
         */
        attachInterface(name: number, callFunc: Function, thisObject: any): void;
        /**
         * 调用接口
         * @param name 接口名
         * @param args 参数列表
         * @return 接口返回值
         */
        call(name: number, ...args: any[]): any;
        /**
         * 清除所有接口
         */
        clearInterfaces(): void;
    }
}
declare namespace digitBeats {
    interface IComponentConstructor {
        ConstructorName: string;
        new (): any;
    }
}
declare namespace digitBeats {
    let __isDebugMode: boolean;
    /**
     * 设置当前运行模式
     * @param flag 运行的模式（true：debug模式，false:生产环境模式）
     */
    function modeDebug(flag: boolean): void;
}
declare namespace digitBeats {
    class SceneManager<globalHandleT> {
        private mainContainer;
        private nowScene;
        private scenePool;
        private __now_tot;
        private __now_cnt;
        private __now_change_scene_id;
        private __now_change_scene_data;
        constructor(mainContainer: eui.UILayer);
        attachScene(id: number, scene: Scene<globalHandleT>, groupName: string[], loadingScene?: LoadingScene): void;
        private scene_interface_change_scene_with_init_data(id, ...d);
        private onResourceGroupLoaded();
        private onResourceGroupLoadedBinded;
        changeSceneWithInitData(id: number, ...d: any[]): void;
    }
}
declare namespace digitBeats {
    abstract class LoadingScene extends digitBeats.Component {
        onBeforeLoad(groups: RES.ResourceItem[][]): void;
        onProgress(cur: number, total: number): void;
    }
}
declare namespace digitBeats {
    class Scene<globalHandleT> extends digitBeats.Component {
        globalHandle: globalHandleT;
        constructor(globalHandle?: globalHandleT);
        initWithData(...d: any[]): void;
        loadBeforeInStage(): Promise<void>;
        changeSceneWithInitData(id: number, ...d: any[]): void;
    }
}
declare namespace digitBeats {
    const enum SceneFunctions {
        changeSceneWithInitData = 0,
    }
}
declare namespace digitBeats {
    /**
     * 克隆一个对象
     * @param obj 要克隆的对象
     */
    function cloneObject(obj: Object): Object;
}
