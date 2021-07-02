namespace digitBeats{
    export class Scene<globalHandleT>extends digitBeats.Component{
        public constructor(public globalHandle:globalHandleT=nil){
            super();
        }
        public initWithData(...d:any[]){
            
        }
        public async loadBeforeInStage(){

        }
        public changeSceneWithInitData(id:number,...d:any[]){
            this.parentInterface.call(SceneFunctions.changeSceneWithInitData,id,...d);
        }
    }
}