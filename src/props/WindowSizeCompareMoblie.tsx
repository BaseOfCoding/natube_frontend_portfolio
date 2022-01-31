import { useEffect, useState } from "react";

// 브라우저 사이즈를 체크하는 함수
export function WindowSizeCompareMoblie(stateFunction: (arg0: boolean) => any) {
  // useState에서 사용하는, 함수를 가지고 있다.
  const setStateFunction = stateFunction;

  // 브라우저의 가로, 세로를 가지고 있는 변수와 해당 변수의 값을 교체시켜줄 수 있는 함수.
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerWidth });

  // 브라우저 사이즈의 가로 사이즈가 변경될 때마다 실행하고, 가로 세로의 값을 setTimeout을 이용해서, 계속 변경해주는 것이 아닌, 200ms마다 체크해서 변경.
  // 물론 가로사이즈가 변경되지 않는다면 불필요한 계산은 하지 않는다.
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

  // useEffect 함수를 한 번 더 실행해서, 만약 767보다 크다면, 전달받은 stateFunction에 true와 false로 변경하여, 모바일 환경인지 아닌 지를 알려준다.
  useEffect(() => {
    windowSize.width > 767 ? setStateFunction(true) : setStateFunction(false);
  }, [windowSize.width]);
}
