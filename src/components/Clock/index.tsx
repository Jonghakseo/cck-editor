import React from "react";
import useTimer from "../../hooks/useTimer";
import { ClockTimeWrapper } from "./style";
import { Theme } from "../../styles/theme";

export interface Props {}

const Clock: React.FC<Props> = (props: Props) => {
  /*
   * state method
   */

  const { min, sec, restart } = useTimer();

  /*
   * custom hook
   */

  /*
   * private method
   */

  /*
   * effect cycle
   */

  /*
   * event handler
   */

  /*
   * render method
   */

  const isExpired = true;
  return (
    <>
      <ClockTimeWrapper isExpired={isExpired}>
        {min} : {sec}
      </ClockTimeWrapper>
      <button onClick={restart}>(재)시작</button>
    </>
  );
};

Clock.defaultProps = {};
export default Clock;
