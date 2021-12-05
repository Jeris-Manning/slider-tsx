type Wrapper = {
  sliderWidth: string;
  trackHeight: string;
  style?: {};
};

type Track = {
  trackHeight: string;
  sliderRadius: string;
  sliderColor: string;
};

type Range = {
  rangeWidth: string;
  rangeRadius: string;
  rangeColor: string;
  style?: {};
};

type Grip = {
  gripWidth?: string;
  gripHeight?: string;
  gripImage: string;
  style?: {};
};

export type SliderProps = {
  wrapperProps?: Wrapper;
  trackProps?: Track;
  rangeProps?: Range;
  gripProps: Grip;
  startVal?: number;
  maxVal?: number;
  onChange: (value: number) => void;
};
