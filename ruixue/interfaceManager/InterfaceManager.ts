namespace ruixue{
    export class InterfaceManager{
        private __interfaces:{[key:string]:{callFunc:Function,thisObject:any}}={};
        /**
         * 注册一个接口供子组件调用
         * @param name 接口名
         * @param callFunc 接口函数
         * @param thisObject 调用接口函数的this上下文
         */
        public attachInterface(name:string,callFunc:Function,thisObject:any):void{
            this.__interfaces[name]={callFunc,thisObject};
        }
        /**
         * 调用接口
         * @param name 接口名
         * @param args 参数列表
         * @return 接口返回值
         */
        public call(name:string,...args:any[]):any{
            if(__isDebugMode){
                if(typeof this.__interfaces[name]=="undefined"){
                    throw new Error("未注册该接口");
                }
            }
            let d=this.__interfaces[name];
            return d.callFunc.call(d.thisObject,...args);
        }
    }
}