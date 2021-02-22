import * as React from "react";


let isMount = true; // 组件是否是第一次渲染
let workInProgressHook = null; // 当前正在处理的hooks

//和组件一一对应
const fiber = {
  stateNode: null,
  // class 保存class的state；
  // function Comp hooks的数据 链式结构 包含顺序
  memorizedState: null
};

export function getApp(comp) {
  fiber.stateNode = comp;
}
export function getVariables(params) {
  return {
    fiber,
    isMount,
    workInProgressHook
  }
}
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
    } while (firstUpdate !== hook.queue.pending)

      hook.queue.pending = null;
  }
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

export default function FunctionComponent(props) {
  const [count, setCount] = useState(12);
  const [val, setVal] = useState(1);

  const add = () => {
    console.log('isMount?', getVariables('isMount'));
    setCount(count => count + 2);
  };
  // const url = '//yapi.recruit-tool.beisen.net/mock/198/wechat-officer/InternalInfo/GetCommentForPy';
  // const getAllData = () => {
  //   fetch(url, {method: 'Get'}).then(res => {
  //     return res.json();
  //   }).then(data => {
  //     return data.data;
  //   })
  // }
  // React.useEffect(() => {
  //  getAllData();
  // }, [count]);

  const handleChange = e => {
    // setVal(e.target.value);
    console.log('isMount?', getVariables('isMount'));
    setVal(data => data + 1);

    //   setData(data => ({
    //     ...data,
    //     // This crashes in React 16 and earlier:
    //     text: e.target.value
    //   }));
  };
  window.handleChange = handleChange;
  window.add = add;
}
