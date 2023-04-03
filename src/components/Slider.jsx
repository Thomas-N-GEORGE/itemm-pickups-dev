import styled from "styled-components";
import { useState } from "react";
import useSound from "use-sound";


const bridgeWidth = 54;

export default function PickupSlider({handleChange, setIsMoving, pickupType}) {

  const [position, setPosition] = useState(80)

  const [play] = useSound('/sounds/switch-on.mp3',
    { volume: 0.5 });

  const onValueChange = (e) => {
    // e.preventDefault();
    const value = parseFloat(e.target.valueAsNumber);
    handleChange('pickupPosition', value);
    setPosition(value);
  }

  const handleMouseUp = () => {
    play();
    setIsMoving(false);
  }

  return(
    <InputContainer pickupWidth={pickupType === "double" ? 108 : 54}>
      <input
        type={"range"}
        value={position}
        min={0}
        max={170}
        onChange={(e) => onValueChange(e)}
        onMouseDown={() => setIsMoving(true)}
        onMouseUp={() => handleMouseUp()}
      />
    </InputContainer>
  )
}

const InputContainer = styled.div`

  position: relative;
  width: calc(100% - ${bridgeWidth}px - ${({pickupWidth}) => pickupWidth - 5}px);
  height: 24px;
  margin: 12px 54px 0 ${({pickupWidth}) => ( pickupWidth - 5 ) / 2}px;
  overflow: visible;
  z-index: 10;

  input {
    margin: 0;
    height: 100%;
    width: 100%;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 60px;

    overflow: visible;

    &:active {
    }
  }


  input[type=range] {
    -webkit-appearance: none;
  }

  input::-moz-range-thumb {
    background-color: transparent;
    border-top: none;
    border-bottom: none;
    width: 5px;
    height: 18px;
    border-left: 1px solid #b2afaf;
    border-right: 1px solid #b2afaf;
    border-radius: 0;
    cursor: grab;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: transparent;
    border-top: none;
    border-bottom: none;
    width: 5px;
    height: 18px;
    border-left: 1px solid #b2afaf;
    border-right: 1px solid #b2afaf;
    border-radius: 0;
    cursor: grab;
  }

  //input::-webkit-slider-thumb {
  //  height: 12px;
  //  transform: translateY(-100px);
  //  cursor: grab;
  //}
`;