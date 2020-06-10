import React, { useReducer, useRef, useEffect } from "react";

import "../../styles/Range.scss";
import sliderReducer, { SET_THUMB_POSITION } from "./Range.reducer";

import { IRangeProps } from "../../client.types";

const Range = ({ classNamePrefix, min, max, onUpdate, currentValue }: IRangeProps) => {
  const mutateInputData = (data: number) => ((data - min) * 100) / (max - min);

  const [state, dispatch] = useReducer(sliderReducer, {
    beforeValue: mutateInputData(currentValue),
    afterValue: 100 - mutateInputData(currentValue)
  });

  useEffect(() => {
    dispatch({ type: SET_THUMB_POSITION, payload: mutateInputData(currentValue) });
  }, [currentValue]);

  const sliderRef: any = useRef();
  const beforeRef: any = useRef();

  const mutateDataForOutput = (data: number) => {
    if (data === 0) return min;

    return ((max - min) * data) / 100 + min;
  };

  const onMouseDown = (e: any) => {
    setThumbPosition(e.clientX);

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
  };

  const onMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e: MouseEvent) => {
    setThumbPosition(e.clientX);
  };

  const setThumbPosition = (clientX: number) => {
    const sliderWidth = sliderRef.current.getBoundingClientRect().width;
    const currentLeft = sliderRef.current.getBoundingClientRect().left;

    const shiftX = clientX - currentLeft;

    if (clientX < currentLeft) {
      dispatch({ type: SET_THUMB_POSITION, payload: 0 });

      return onUpdate(mutateDataForOutput(0));
    } else if (shiftX > sliderWidth) {
      dispatch({ type: SET_THUMB_POSITION, payload: 100 });

      return onUpdate(mutateDataForOutput(100));
    }

    const percent = (shiftX * 100) / sliderWidth;

    dispatch({ type: SET_THUMB_POSITION, payload: percent });

    return onUpdate(mutateDataForOutput(percent));
  };

  return (
    <div
      ref={sliderRef}
      onMouseDown={onMouseDown}
      className={classNamePrefix + "__slider range-wrap"}
    >
      <span
        ref={beforeRef}
        style={{ width: `${state.beforeValue}%` }}
        className={classNamePrefix + "__track-before range__track-before"}
      >
        <span className={classNamePrefix + "__track-thumb range__track-thumb"} />
      </span>

      <span
        style={{ width: `${state.afterValue}%` }}
        className={classNamePrefix + "__track-after range__track-after"}
      />
    </div>
  );
};

export default Range;
