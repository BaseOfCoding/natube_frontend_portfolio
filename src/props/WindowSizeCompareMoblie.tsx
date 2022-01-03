import { useEffect, useState } from "react";

export function WindowSizeCompareMoblie(stateFunction: (arg0: boolean) => any) {
  const setStateFunction = stateFunction;

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerWidth });

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    let windowSizer = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowSize({ width: document.body.clientWidth, height: document.body.clientHeight });
      }, 200);
    };
    window.addEventListener("resize", windowSizer);

    return () => {
      window.removeEventListener("resize", windowSizer);
    };
  }, [windowSize]);

  useEffect(() => {
    windowSize.width > 767 ? setStateFunction(true) : setStateFunction(false);
  }, [windowSize.width]);
}
