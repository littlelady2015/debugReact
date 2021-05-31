import { useEffect } from "react";
import { React, ReactDOM, useState , useRef} from "../CONST";
import DiffPage from "./DiffPage";

export default function IceCream(props) {
  const [iceCream, setIceCream] = useState(0);
  const [people, setPeople] = useState(100);
  // const ref = useRef();
  // const eat = () => {
  //   setIceCream(iceCream - 1);
  //   setPeople(people - 1);
  // };
  const buy = () => {
    setIceCream(iceCream + 10);
    if (iceCream > 10) {
      props.onDestroy();
    }
  };
  // useEffect(() => {
  //   console.log(`I am the BB King`);
  //   return () => {
  //     console.debug(`return I am the BB King`);
  //   }
  // }, [iceCream]);
  // useEffect(() => {
  //   ref.current = {
  //     zhanghaha: 'zhanghaha~'
  //   }
  // },[]);
  return (
    <div>
      <div>
        we have {iceCream} icecreams
      </div>
      we have {people} customers.
      <br />
      {/* <button onClick={eat}>eat</button> */}
      <button onClick={buy}>buy</button>
    </div>
  );
}
