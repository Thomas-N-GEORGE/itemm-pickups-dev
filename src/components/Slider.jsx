import styled from "styled-components";
import { useState } from "react";


export default function PickupSlider({handleChange, setIsMoving}) {

  const [position, setPosition] = useState(1)

  const onValueChange = (e) => {
    // e.preventDefault();
    const value = parseFloat(e.target.valueAsNumber);
    handleChange('pickupPosition', value);
    setPosition(value);
  }

  return(
    <PickupContainer>
      <input
        type={"range"}
        value={position}
        min={0}
        max={170}
        onChange={(e) => onValueChange(e)}
        onMouseDown={() => setIsMoving(true)}
        onMouseUp={() => setIsMoving(false)}
      />
    </PickupContainer>
  )
}

const PickupContainer = styled.div`

  position: relative;
  width: calc(100% - 124px);
  height: 24px;
  margin: 12px 42px 0 42px;
  overflow: visible;

  input {
    margin: 0;
    height: 100%;
    width: 100%;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: transparent;
    overflow: visible;

    &:active {
      //background-color: red;
    }
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

  //input::-webkit-slider-thumb {
  //  height: 12px;
  //  transform: translateY(-100px);
  //  cursor: grab;
  //}
`;