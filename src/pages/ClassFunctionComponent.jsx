import {React, useState, useEffect, Component} from "../CONST";
// import App, { useState } from '../freact/hooks';
export default class ClassFunctionComponent extends Component {
  render() {
    // getApp(FunctionComponent)
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
  const [data, setData] = useState({});
  const [val, setVal] = useState(0);

  useEffect(() => {
    getAllData();

    return () => {
      console.log('clear effect');
    }
  }, [val])
  useEffect(() => {
    getAllData();
    getAllData();
    return () => {
      console.log('clear effect111');
    }
  }, [val]);
  useEffect(() => {
    getAllData();
    getAllData();
    getAllData();
    return () => {
      console.log('clear effect2222');
    }
  }, [val])
  // const url = '//yapi.recruit-tool.beisen.net/mock/198/wechat-officer/InternalInfo/GetCommentForPy';
  const url = '//localhost:8080/GetCommentForPy.json';
  const getAllData = () => {
    fetch(url, {method: 'Get'}).then(res => {
      return res.json()
    }).then(d => {
      setData(d);
    })
  }
  const handleClick = () => {
    setVal(val+1)
  }

  return (
    <div>
      <button onClick={handleClick}>点击按钮</button>
      {data.code}
    </div>
  )

}
