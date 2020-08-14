namespace ruixue{
    export class CycleManager<T extends ICycleObject>{
        private source:T[]=[];
        public constructor(private constructorName:any){
            if(__isDebugMode){
                if(typeof constructorName["name"]=="undefined"){
                    throw new Error("不合法的构造器");
                }
            }
        }
        /**
         * 从对象池中获取一个对象
         */
        public create():T{
            if(this.source.length>0){
                let d=this.source.pop();
                d.onStart();
                return d;
            }else{
                let d=<T>new this.constructorName();
                d.onStart();
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