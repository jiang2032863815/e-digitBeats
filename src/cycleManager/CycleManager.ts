namespace digitBeats{
    export class CycleManager<T extends ICycleObject>{
        private source:T[]=[];
        public constructor(private constructorName:IComponentConstructor){
            
        }
        /**
         * 从对象池中获取一个对象
         */
        public create():T{
            if(this.source.length>0){
                let d=this.source.pop();
                d.onStart();
                d.__onNew();
                return d;
            }else{
                let d=<T>new this.constructorName();
                return d;
            }
        }
        /**
         * 释放一个对象到对象池
         */
        public release(d:T):void{
            d.onEnd();
            this.source.push(d);
        }
    }
}