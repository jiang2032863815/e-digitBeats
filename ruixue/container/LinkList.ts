namespace ruixue{
    export class Node<T> implements ICycleObject{
        private __pre:Node<T>=nil;
        private __nxt:Node<T>=nil;
        /**
         * @return 当前节点的值
         */
        public val:T;
        /**
         * @return 当前节点的后继节点
         */
        public nxt():Node<T>{
            return this.__nxt;
        }
        /**
         * @return 当前节点的前驱节点
         */
        public pre():Node<T>{
            return this.__pre;
        }
        /**
         * 设置后继节点
         * @param v 后继节点
         */
        public setNxt(v:Node<T>):void{
            this.__nxt=v;
        }
        /**
         * 设置前驱节点
         * @param v 前驱节点
         */
        public setPre(v:Node<T>):void{
            this.__pre=v;
        }
        /**
         * 当节点被初始化（整个生命周期只会执行一次）
         */
        public onStart():void{
            this.__pre=this.__nxt=nil;
        }
        /**
         * 当节点被对象池回收导致结束生命周期（整个生命周期只会执行一次）
         */
        public onEnd():void{
            this.__pre=this.__nxt=nil;
        }
        /**
         * 设置节点的值
         * @param v 节点的值
         */
        public setVal(v:T):void{
            this.val=v;
        }
        public constructor(){
            this.onStart();
        }
    }
    export class LinkList<T>{
        private __head:Node<T>=nil;
        private __tail:Node<T>=nil;
        private __cycleManager=new CycleManager<Node<T>>(Node);
        private __createNode(val:T):Node<T>{
            let d=this.__cycleManager.create();
            d.setVal(val);
            return d;
        }
        /**
         * 往链表尾端接上一个节点
         * @param val 该节点的值
         * @return 返回该节点
         */
        public pushBack(val:T):Node<T>{
            let nd=this.__createNode(val);
            if(this.__head==nil){
                this.__head=this.__tail=nd;
            }else{
                this.__tail.setNxt(nd);
                nd.setPre(this.__tail);
                this.__tail=nd;
            }
            return nd;
        }
        /**
         * 往链表首端接上一个节点
         * @param val 该节点的值
         * @return 返回该节点
         */
        public pushFront(val:T):Node<T>{
            let nd=this.__createNode(val);
            if(this.__head==nil){
                this.__head=this.__tail=nd;
            }else{
                this.__head.setPre(nd);
                nd.setNxt(this.__head);
                this.__head=nd;
            }
            return nd;
        }
        /**
         * 从链表中删除一个节点
         * @param nd 即将被删除的节点
         */
        public removeNode(nd:Node<T>):void{
            if(nd==nil)return;
            if(this.__head==nd){
                this.__head=this.__head.nxt();
                if(this.__head!=nil){
                    this.__head.setPre(nil);
                }
            }else if(this.__tail==nd){
                this.__tail=this.__tail.pre();
                if(this.__tail!=nil){
                    this.__tail.setNxt(nil);
                }
            }else{
                if(__isDebugMode){
                    if(nd.pre()==nil||nd.nxt()==nil){
                        throw new Error("双向链表节点删除错误");
                    }
                }
                nd.pre().setNxt(nd.nxt());
                nd.nxt().setPre(nd.pre());
            }
            this.__cycleManager.release(nd);
        }
        /**
         * @return 返回链表的头节点
         */
        public front():Node<T>{
            return this.__head;
        }
        /**
         * @return 返回链表的尾结点
         */
        public back():Node<T>{
            return this.__tail;
        }
        /**
         * @return 返回当前链表是否为空
         */
        public isEmpty():boolean{
            return this.__head==nil;
        }
    }
}