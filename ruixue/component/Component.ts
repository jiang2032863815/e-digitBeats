namespace ruixue{
    export abstract class Component extends eui.Component implements ICycleObject{
        private static __cycleManagers:{[key:string]:CycleManager<any>}={};
        /**
         * 创建组件，优先从对象池中获取
         * @param constructorName 继承自ruixue.Component的类的类名
         * @return 所创建的组建
         */
        public static createComponent<T extends Component>(constructorName:any):T{
            if(__isDebugMode){
                if(typeof constructorName["name"]=="undefined"){
                    throw new Error("不合法的构造器");
                }
            }
            if(typeof this.__cycleManagers[constructorName["name"]]=="undefined"){
                this.__cycleManagers[constructorName["name"]]=new CycleManager<T>(constructorName);
            }
            return this.__cycleManagers[constructorName["name"]].create();
        }
        /**
         * 释放组建对象到对象池中
         * @param constructorName 继承自ruixue.Component的类的类名
         * @param obj 即将被释放的对象
         */
        public static releaseComponent<T extends Component>(constructorName:any,obj:T):void{
            if(__isDebugMode){
                if(typeof constructorName["name"]=="undefined"){
                    throw new Error("不合法的构造器");
                }
            }
            if(typeof this.__cycleManagers[constructorName["name"]]=="undefined"){
                this.__cycleManagers[constructorName["name"]]=new CycleManager<T>(constructorName);
            }
            obj.removeEventListener(egret.Event.ADDED_TO_STAGE,obj.__onAddToStage,obj);
            obj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,obj.__onRemovedFromStage,obj);
            this.__cycleManagers[constructorName["name"]].release(obj);
        }
        private __onUpdate(dt:number):boolean{
            this.onUpdate(dt);
            return false;
        }
        public __onAddToStage():void{
            egret.startTick(this.__onUpdate,this);
            this.onAddToStage();
        }
        public __onRemovedFromStage():void{
            egret.stopTick(this.__onUpdate,this);
            this.onRemovedFromStage();
        }
        public parentInterface=new InterfaceManager();
        public constructor(){
            super();
            this.onStart();
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
         * @param 从组件被添加到父节点上之后所经历的毫秒数
         */
        public onUpdate(dt?:number):void{
            
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