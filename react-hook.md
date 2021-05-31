### dispatcher来自于哪里？
### 为什么会有不同的dispatcher？
通过不同环境，不同上下文使用不同的dispatcher,可以对hook进行一些区别性的对待；
比如： hookDispatcherOnMountInDev 增加了对hooks的类型检查；
### useState
updateWorkInProgressHook
正常情况下的更新+render阶段的更新；
举例子：
```
if(iceCream < 2) setIceCream(iceCream+1)
```



### useEffect
mountEffectImpl 在useEffect useLayoutEffect mount阶段执行, hook的flag不同；
fiberFlag为何不同？ 用于区分useEffect useLayoutEffect
hookFlags作用？ update passive有什么区别？ 为什么在mount阶段也会update?
pushEffect
什么时候会走到lastEffect为null的逻辑
在mount时将effect挂载到componentUpdateQueue上，并将effct指向自己，与update数据结构类似；
updateEffectImpl
只有在updateEffectImpl中才能取到上一个hook的destroy
当依赖项有改变时，传依赖项按位或
在function component中，hook是保存在fiber.memoriozedState上，形成单向链表，顺序不可以改变；
effect也是保存在单向链表上，保存在updateQueue上
什么时候走入lastEffect === null的逻辑？
在commit的before Mutation阶段，执行 flushPassiveUnmountEffects 会改变effect的指向，可能在这里？ 

useLayoutEffect useEffect 标记不同的hookFlag 会在commit的不同阶段调用，commit时详细讲解；
commit阶段的起点是commitRoot 在beforeMutation阶段，会调度Effect
commitBeforeMutationEffect 调度一个回调函数 
第二个重要的阶段 commitLayoutEffects
commitHookEffectListMount 执行effect；
整体逻辑走完时候会走到commitRootImpl
等待调度执行完成
flushPassiveEffectImpl



### useRef
数据结构
createRef 生命周期
在render阶段 为带有ref的fiber带上effectTag，对应的tag为Ref
在commit阶段 对带有Ref effectTag的fiber执行对应的操作

render markRef 标记ref
什么时候进入markRef？
mount时，fiber带有ref属性，update时，ref的current发生改变的情况

commit - layout阶段 commitAttachRef 在commitLayoutEffects 按位与 effectTag
进入commitAttachRef 执行ref传入的函数 或者 给ref.current赋值

update阶段 点击删除节点，进入deletion EffectTag的情况
对当前的fiber以及fiber的子树进行递归，对子孙的ref执行类似commitDetachRef的操作

在commitMutationEffect的情况下，根据tag进入了commitDeletion
进入循环 commitNestedUnmount 区分hostComponent classComponent的情况 这里走了生命周期 
safelyDetachRef 


### commit
//
开始于commitRoot 以一个优先级进行调度
commitImpl
passiveEffect 举例子：function comp 需要调用的useEffect fiber增加passiveEffect的tag
在开始commit阶段，是否有未执行的effect，如果有，执行它
重置render阶段的全局变量
一次循环commitBeforeMutationEffects
一次循环 commitLayoutEffects
commit阶段的结尾，将fiber重新调度一遍；ensureRootIsScheduled
把同步的更新放在一个队列中，function comp layout中setState 在flushSyncCallbackQueue中执行；
legacyMode 所有更新同步执行
concurrentMode 任务以不同优先级执行





beforeMutation
mutation
layout

### 双缓存机制
动画原理
先清除前一帧 然后绘制下一帧图片 展示  时间过长 就会白屏闪烁
内存中构建 直接替换的技术 
展示图
第一次调用ReactDOM.render 创建当前应用的根结点 fiberRootNode
每次调用reactDom.render 会创建当前应用的根结点 rootFiber
每个wipfiber 与 currentFiber 通过alternate属性共享属性
页面内容的fiber树 currentFiber
由于触发了更新，在内存中创建的fiber树，workInProgressFiber树 采用深度优先遍历 
当wipFiber树完成了渲染，fiberRootNode,current 指针 指向wipFiber的根结点，此时就变成了currentFiber树
首屏渲染与更新最大的区别在于 是否有diff算法；
完成渲染后，fiberRootNode.current指向wipFiber，此时wipFiber就变成了currentFiber
来自于React新架构-fiber
#####作为静态的数据结构
FiberRootNode.current -> rootFiber
rootFiber.stateNode -> FiberRootNode
#####作为动态的工作单元
保存了组件需要更新的状态和需要执行的副作用 
fiber {
  index: dom插入的顺序
}



### diff 
多节点 多个同级jsx对象的情况
key相同 type不同 创建一个新的fiber节点 createFiberFromElement
placeChild new fiber 标记插入tag
lastPlaceIndex // 本次更新的dom节点在页面中要插入的位置

