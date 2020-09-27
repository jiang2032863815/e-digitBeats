namespace digitBeats{
    export interface ICycleObject{
        onStart():void;
        onEnd():void;
        __onNew():void;
    }
}