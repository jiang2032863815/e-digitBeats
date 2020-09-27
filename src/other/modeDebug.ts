namespace digitBeats{
    export let __isDebugMode:boolean=true;
    /**
     * 设置当前运行模式
     * @param flag 运行的模式（true：debug模式，false:生产环境模式）
     */
    export function modeDebug(flag:boolean):void{
        __isDebugMode=flag;
    }
}