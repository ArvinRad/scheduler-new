import {useState} from "react";

// state setter for the operation modes
const useVisualMode = (initial) => {

  let [mode, setMode] = useState(initial);
  let [history, setHistory] = useState([initial]);
  // transition to next mode with replacing the previous modes for confirmations
  const transition = (newMode, replace = false) => {

    setMode(newMode);
    let newHistory = [...history];
    if (replace) {
      newHistory = newHistory.slice(0,-1);
    };
    setHistory(() => ([...newHistory, newMode]));
  };

  const back = () => {
    let newHistory = [...history];
    newHistory = newHistory.slice(0,-1);
    setHistory(() => ([...newHistory, newMode]));
    const newMode = history[history.length - 1];
    setMode(newMode);
  };

  return { mode, transition, back };
}


export default useVisualMode