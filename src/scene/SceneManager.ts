namespace digitBeats{
    export class SceneManager<globalHandleT>{
        private nowScene:Scene<globalHandleT>=nil;
        private scenePool:{[key:number]:{loadingScene:LoadingScene,scene:Scene<globalHandleT>,groupName:string[]}}={};
        private __now_tot:number;
        private __now_cnt:number;
        private __now_change_scene_id:number;
        private __now_change_scene_data:any[];
        public constructor(private mainContainer:eui.UILayer){
            mainContainer.removeChildren();
        }
        public attachScene(id:number,scene:Scene<globalHandleT>,groupName:string[],loadingScene:LoadingScene=nil){
            this.scenePool[id]={scene,loadingScene,groupName};
            scene.parentInterface.attachInterface(SceneFunctions.changeSceneWithInitData,this.scene_interface_change_scene_with_init_data,this);
        }
        private scene_interface_change_scene_with_init_data(id:number,...d:any[]){
            this.changeSceneWithInitData(id,...d);
        }
        private onResourceGroupLoaded(){
            if(++this.__now_cnt>=this.__now_tot){
                if(this.scenePool[this.__now_change_scene_id].loadingScene!=nil){
                    this.mainContainer.removeChild(this.scenePool[this.__now_change_scene_id].loadingScene);
                }
                this.nowScene.initWithData(...this.__now_change_scene_data);
                this.mainContainer.addChild(this.nowScene);
            }
        }
        private onResourceGroupLoadedBinded=this.onResourceGroupLoaded.bind(this);
        public changeSceneWithInitData(id:number,...d:any[]){
            if(!this.scenePool[id]){
                throw new Error("未找到该场景！！！");
            }
            if(this.nowScene!=nil){
                this.mainContainer.removeChild(this.nowScene);
            }
            this.__now_change_scene_id=id;
            let groups=this.scenePool[id].groupName;
            this.__now_tot=0;
            for(let i=0;i<groups.length;i++){
                if(RES.isGroupLoaded(groups[i]))continue;
                this.__now_tot++;
            }
            this.nowScene=this.scenePool[id].scene;
            if(this.__now_tot==0){
                this.nowScene.initWithData(...d);
                this.mainContainer.addChild(this.nowScene);
            }else{
                if(this.scenePool[id].loadingScene!=nil){
                    this.mainContainer.addChild(this.scenePool[id].loadingScene);
                    let groupItems:RES.ResourceItem[][]=[];
                    for(let i=0;i<groups.length;i++){
                        if(RES.isGroupLoaded(groups[i]))continue;
                        groupItems.push(RES.getGroupByName(groups[i]));
                    }
                    this.scenePool[id].loadingScene.onBeforeLoad(groupItems);
                }
                this.__now_cnt=0;
                for(let v of groups){
                    if(RES.isGroupLoaded(v))continue;
                    if(this.scenePool[id].loadingScene!=nil){
                        RES.loadGroup(v,0,this.scenePool[id].loadingScene).then(this.onResourceGroupLoadedBinded);
                    }else{
                        RES.loadGroup(v,0).then(this.onResourceGroupLoadedBinded);
                    }
                }
            }
        }
    }
}