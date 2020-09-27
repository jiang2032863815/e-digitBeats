namespace digitBeats{
    /**
     * 克隆一个对象
     * @param obj 要克隆的对象
     */
    export function cloneObject(obj:Object):Object{
        if(obj==undefined||obj==nil)return nil;
        let ret:any;
        if(obj instanceof Array){
            ret=[];
        }else if(obj instanceof Object){
            ret=new Object();
        }else{
            return ret;
        }
        for(let i in obj){
            if(obj[i] instanceof Object){
                ret[i]=cloneObject(obj[i]);
            }else{
                ret[i]=obj[i];
            }
        }
        return ret;
    }
}