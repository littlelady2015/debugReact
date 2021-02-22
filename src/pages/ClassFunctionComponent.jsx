import * as React from "react";

import { Component } from "react";
import { getApp, getVariables,  useState } from '../kreact/hooks';

export default class ClassFunctionComponent extends Component {
  render() {
    getApp(FunctionComponent)
    return (
      <div>
        <h3>ClassFunctionComponent</h3>
        {/* <ClassComponent /> */}
        <FunctionComponent />
      </div>
    );
  }
}

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.getElementById("btn").addEventListener("click", () => {
      this.change(100);
      this.change(200);
    });
  }
  add = () => {
    /**
     * ReactDOM源码中如果加这个可以使用unstable_unbatchedUpdates
     * import { unbatchedUpdates} from 'react-reconciler/src/ReactFiberReconciler';
      unbatchedUpdates as unstable_unbatchedUpdates,
     */
    // ReactDOM.unstable_unbatchedUpdates(() => {
    this.change(1);
    // this.change(2);
    // });
  };

  change = val => {
    this.setState({
      count: this.state.count + val
    });
    console.log("count", this.state.count); //sy-log
  };

  render() {
    return (
      <div className="border">
        <h3>ClassComponent</h3>
        <p>{this.state.count}</p>
        <button onClick={this.add}>add</button>
        <button id="btn">原生</button>
      </div>
    );
  }
}

function FunctionComponent(props) {
  const [count, setCount] = useState(12);
  const [val, setVal] = useState();

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
    setVal(data => e.target.value);

    //   setData(data => ({
    //     ...data,
    //     // This crashes in React 16 and earlier:
    //     text: e.target.value
    //   }));
  };
  return (
    <div className="border">
      <h3>FunctionComponent</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
      <input type="text" value={val} onChange={handleChange} />
    </div>
  );
}
