import styled from "styled-components";
import { useContext } from "react";
import useSound from "use-sound";
import { AppCtx } from "../contexts/state";


const bridgeWidth = 54;

export default function PickupSlider() {

  const { pickup, update } = useContext(AppCtx);

  const [play] = useSound('/sounds/switch-on.mp3',
    { volume: 0.5 });

  const onValueChange = (e) => {
    // e.preventDefault();
    const rangeValue = parseFloat(e.target.valueAsNumber);
    const pickupSize = pickup.double ? 108 : 54;
    const position = rangeValue * ((880 - pickupSize - 54) / 170 );

    update('pickup', {
      ...pickup,
      position: position,
      rangeValue: rangeValue,
    });
  }

  const handleMouseDown = () => {
    update('pickup', {...pickup, isMoving: true});
  }

  const handleMouseUp = () => {
    play();
    update('pickup', {...pickup, isMoving: false});
  }

  return(
    <InputContainer pickupWidth={pickup.double ? 108 : 54}>
      <input
        type={"range"}
        value={pickup.rangeValue}
        min={0}
        max={170}
        onChange={(e) => onValueChange(e)}
        onMouseDown={() => handleMouseDown()}
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
    width: 8px;
    height: 18px;
    border-left: 1px solid #b2afaf;
    border-right: 1px solid #b2afaf;
    border-radius: 0;
    cursor: grab;
  }
`;