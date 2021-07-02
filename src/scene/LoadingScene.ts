namespace digitBeats{
    export abstract class LoadingScene extends digitBeats.Component{
        public onBeforeLoad(groups:RES.ResourceItem[][]){}
        public onProgress(cur:number,total:number){}
    }
}