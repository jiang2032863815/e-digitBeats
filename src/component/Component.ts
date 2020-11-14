namespace digitBeats{
    class FrameManager{
        private __frameElements=new LinkList<Component>();
        private __elementMap:{[key:number]:Node<Component>}={};
        addToFrameSystem(c:Component):Node<Component>{
            let t=this.__frameElements.pushBack(c);
            this.__elementMap[c.ruixueCode]=t;
            return t;
        }
        removeFromFrameSystem(c:Component){
            let t=this.__elementMap[c.ruixueCode];
            if(!t)return;
            delete this.__elementMap[c.ruixueCode];
            this.__frameElements.removeNode(t);
        }
        private __onTick():boolean{
            for(let i=this.__frameElements.front();i!=digitBeats.nil;i=i.nxt()){
                i.val.onUpdate();
            }
            return false;
        }
        constructor(){
            egret.startTick(this.__onTick,this);
        }
    }
    let rxCode=0;
    let fManager=new FrameManager();
    export abstract class Component extends eui.Component implements ICycleObject{
        private static __cycleManagers:{[key:string]:CycleManager<any>}={};
        /**
         * 创建组件，优先从对象池中获取
         * @param constructorName 继承自ruixue.Component的类的类名
         * @return 所创建的组建
         */
        public static createComponent<T extends Component>(constructorName:IComponentConstructor):T{
            if(!this.__cycleManagers[constructorName.ConstructorName]){
                this.__cycleManagers[constructorName.ConstructorName]=new CycleManager<T>(constructorName);
            }
            let t=this.__cycleManagers[constructorName.ConstructorName].create();
            return t;
        }
        /**
         * 释放组建对象到对象池中
         * @param constructorName 继承自ruixue.Component的类的类名
         * @param obj 即将被释放的对象
         */
        public static releaseComponent<T extends Component>(constructorName:IComponentConstructor,obj:T):void{
            if(!this.__cycleManagers[constructorName.ConstructorName]){
                this.__cycleManagers[constructorName.ConstructorName]=new CycleManager<T>(constructorName);
            }
            obj.parentInterface.clearInterfaces();
            obj.removeEventListener(egret.Event.ADDED_TO_STAGE,obj.__onAddToStage,obj);
            obj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,obj.__onRemovedFromStage,obj);
            this.__cycleManagers[constructorName.ConstructorName].release(obj);
        }
        public ruixueCode:number;
        public __onAddToStage():void{
            this.onAddToStage();
            fManager.addToFrameSystem(this);
        }
        public __onRemovedFromStage():void{
            fManager.removeFromFrameSystem(this);
            this.onRemovedFromStage();
        }
        public parentInterface=new InterfaceManager();
        public constructor(){
            super();
            this.ruixueCode=++rxCode;
            this.onStart();
            this.__onNew();
        }
        __onNew(){
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.__onAddToStage,this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.__onRemovedFromStage,this);
        }
        /**
         * 当组件开始生命周期（整个生命周期只会调用一次）
         */
        public onStart():void{

        }
        /**
         * 当组件被对象池回收导致结束生命周期（整个生命周期只会调用一次）
         */
        public onEnd():void{

        }
        /**
         * 当进入下一帧
         */
        public onUpdate():void{
            
        }
        /**
         * 当组件被添加到舞台上
         */
        public onAddToStage():void{

        }
        /**
         * 当组件从舞台中移除
         */
        public onRemovedFromStage():void{

        }
    }
}