import {React, ReactDOM, useState} from "../CONST";
import { useEffect } from "../react/packages/react/src/ReactHooks";

export default function DiffPage(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="border">
      <button onClick={() => setCount(count + 1)}>{count}： count add</button>

      {count % 2 ? (
        <>
          <li key="0">0</li>
          <li key="1">1</li>
        </>
      ) : (
        <>
          <li key="0">0</li>
          <li key="2">1</li>
        </>
      )}
    </div>
  );
}
