import React, { useLayoutEffect, useRef, useCallback } from "react";
import { getPercentage, getValue, getWidth } from "./Utilities/functions";
import styled from "styled-components";
import { SliderProps } from "./Utilities/types";

function Slide({
  wrapperProps,
  trackProps,
  rangeProps,
  gripProps,
  startVal = 25,
  maxVal = 100,
  onChange,
}: SliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null!);
  const sliderRef = useRef<HTMLDivElement>(null!);
  const rangeRef = useRef<HTMLDivElement>(null!);
  const gripRef = useRef<HTMLImageElement>(null!);
  const diffRef = useRef(0);
  const currentRef = useRef(0);

  const getLeft = useCallback((percentage: number) => {
    return `calc(${percentage}% - ${gripRef.current.offsetWidth / 2}px)`;
  }, []);

  const handleUpdate = useCallback((value, percentage) => {
    gripRef.current.style.left = getLeft(percentage);
    rangeRef.current.style.width = getWidth(percentage);
    currentRef.current = value;
  }, []);

  const handleMouseMove = (event: MouseEvent): any => {
    let newX =
      event.clientX -
      diffRef.current -
      sliderRef.current.getBoundingClientRect().left;

    const end = sliderRef.current.offsetWidth - gripRef.current.offsetWidth;

    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, end);
    const newValue = getValue(newPercentage, maxVal);

    handleUpdate(newValue, newPercentage);

    onChange(newValue);
  };

  const handleMouseUp = (): any => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>): any => {
    diffRef.current =
      event.clientX - gripRef.current.getBoundingClientRect().left;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useLayoutEffect(() => {
    const initialPercentage = getPercentage(startVal, maxVal);
    handleUpdate(startVal, initialPercentage);
    wrapRef.current.style.height = `${gripRef.current.offsetHeight}px`;
    gripRef.current.style.top = `-${
      (gripRef.current.offsetHeight - sliderRef.current.offsetHeight) / 2
    }px`;
  }, [startVal, handleUpdate]);

  return (
    <SlideWrapper {...wrapperProps} ref={wrapRef}>
      <SliderTrack {...trackProps} ref={sliderRef}>
        <RangeTrack {...rangeProps} ref={rangeRef} />
        <Grip
          draggable="false"
          src={gripProps.gripImage}
          ref={gripRef}
          onMouseDown={handleMouseDown}
          {...gripProps}
        />
      </SliderTrack>
    </SlideWrapper>
  );
}

export default Slide;

const SlideWrapper = styled.div.attrs(
  (props: { sliderHeight?: string; sliderWidth?: string }) => ({
    sliderWidth: props.sliderWidth || "100%",
    sliderHeight: props.sliderHeight || "20px",
  })
)`
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  width: ${(props) => props.sliderWidth};
  height: ${(props) => props.sliderHeight};
`;

const SliderTrack = styled.div.attrs(
  (props: {
    trackHeight?: string;
    sliderRadius?: string;
    sliderColor?: string;
  }) => ({
    trackHeight: props.trackHeight || "12px",
    sliderRadius: props.sliderRadius || "2px",
    sliderColor: props.sliderColor || "rgba(0, 200, 240, .5)",
  })
)`
  position: relative;
  width: 100%;
  user-select: none;
  height: ${(props) => props.trackHeight};
  background-color: ${(props) => props.sliderColor};
  border-radius: ${(props) => props.sliderRadius};
`;

const RangeTrack = styled.div.attrs(
  (props: {
    rangeWidth?: string;
    rangeRadius?: string;
    rangeColor?: string;
  }) => ({
    rangeColor: props.rangeColor || "purple",
    rangeWidth: props.rangeWidth || "40%",
    rangeRadius: props.rangeRadius || "2px",
  })
)`
  position: absolute;
  height: 100%;
  user-select: none;
  background-color: ${(props) => props.rangeColor};
  width: ${(props) => props.rangeWidth};
  border-radius: ${(props) => props.rangeRadius};
`;

const Grip = styled.img.attrs(
  (props: { gripWidth?: string; gripHeight?: string }) => ({
    gripWidth: props.gripWidth || "maxContent",
    gripHeight: props.gripHeight || "maxContent",
  })
)`
  top: -10px;
  position: relative;
  z-index: 2;
  user-select: none;
  cursor: pointer;
  width: ${(props) => props.gripWidth};
  height: ${(props) => props.gripHeight};
`;
