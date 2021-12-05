import { useState } from "react";
import Slide from "./Slide";
import Skull from "./shrunkenSkull.png";

const App = () => {
  const [slVal, setSlVal] = useState(25);

  const handleSlider = (value: number) => {
    setSlVal(() => value);
  };

  return (
    <div>
      <h1>{slVal}</h1>
      <Slide onChange={handleSlider} gripProps={{ gripImage: Skull }} />
    </div>
  );
};

export default App;
