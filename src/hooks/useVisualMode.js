import React, {useState} from "react";


const useVisualMode = (initial) => {

  let [mode, setMode] = useState(initial);
  let [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    setMode(newMode);

    if (replace) {
      history.slice(0,-1);
    };

    setHistory(prev => ([...prev, newMode]))
  };

  const back = () => {
    history = history.slice(0,-1);
    setHistory(history);
    const newMode = history[history.length - 1];
    setMode(newMode);
  };

  return { mode, transition, back };
}


  export default useVisualMode