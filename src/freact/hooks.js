import * as React from "react";


let isMount = true; // 组件是否是第一次渲染
let workInProgressHook = null; // 当前正在处理的hooks

//和组件一一对应
const fiber = {
  stateNode: App,
  memorizedState: null
  // class 保存class的state；
  // function Comp hooks的数据 链式结构 包含顺序
};
function schedule() {
  workInProgressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
  schedule();
}

export function useState(initialState) {
  let hook;

  if (isMount) {
    hook = {
      queue: {
        pending: null
      },
      memoizedState: initialState,
      next: null
    }
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next)

    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

export default function App() {
  const [num, setNum] = useState(1);
  return (<div>
    <span>{num}</span>
    <button onClick={() => setNum(a => a + 1)}>click me!</button>
  </div>)
}
