import { useEffect, useState } from "react";

interface Time {
  min: number;
  sec: number;
  restart: () => void;
}

const LIMIT = 180;

const DELAY = 1000;

export default function useTimer(onTimeEnd?: () => void): Time {
  const [sec, setSec] = useState(0);
  const [toggle, setToggle] = useState(false);

  const restart = () => {
    setSec(LIMIT);
    setToggle((t) => !t);
  };

  useEffect(() => {
    if (sec === 0) {
      onTimeEnd && onTimeEnd();
    }
  }, [sec, onTimeEnd]);

  useEffect(() => {
    let x: NodeJS.Timeout | null = null;

    function ticking() {
      // ! interval 1000ms
      x = setInterval(() => {
        setSec((p) => {
          if (p > 0) {
            return p - 1;
          } else {
            x && clearInterval(x);
            x = null;
            return 0;
          }
        });
        console.timeEnd("tick");
        console.time("tick");
      }, DELAY);

      // ! timeout 재귀
      // console.time("tick");
      // x = setTimeout(() => {
      //   setSec((p) => {
      //     if (p > 0) {
      //       return p - 1;
      //     }
      //     clearTimeout(x);
      //     x = null;
      //     return 0;
      //   });
      //   ticking();
      //   console.timeEnd("tick");
      // }, DELAY);
    }

    ticking();

    return () => {
      x && clearInterval(x);
      // x && clearTimeout(x);
      x = null;
    };
  }, [toggle]);

  const exposeMin = Math.floor(sec / 60);
  const exposeSec = sec % 60;
  return { min: exposeMin, sec: exposeSec, restart };
}
