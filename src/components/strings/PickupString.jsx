import styled from "styled-components";
import { useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";


export default function PickupString({settings, handleChange}) {

  const [pickX, setPickX] = useState(0);
  const [showPick, setShowPick] = useState(false);
  const [vibration, setVibration] = useState(false);

  const { size, name, stripes } = settings;
  const { width } = useWindowDimensions();

  const handleMouseEnter = (e) => {
    setPickX(e.clientX - ((width - 1200) / 2));
    setShowPick(true);
  }

  const handleMouseMove = (e) => {
    setPickX(e.clientX - ((width - 1200) / 2));
  }

  const handleMouseLeave = () => {
    setShowPick(false);
  }

  const vibrate = (e) => {

    let leftGap = ((width - 1200) / 2)

    handleChange({
      "selectedString": name,
      "excitementPosition": Math.trunc(170 - ((e.clientX - leftGap) * (170 / (880 - 54) )) ) + 1
    })
    setVibration(true);
    setTimeout(() => {
      setVibration(false);
    }, 1500)
  }

  return (
      <StringContainer
        onClick={(e) => vibrate(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}>
        <StringLine
          size={size}
          stripes={stripes}
          className={vibration ? 'vibrate' : 'chill'}/>
        { showPick &&
          <Pick className={vibration ? 'hide-pick' : 'chill'} x={pickX}/>
        }
      </StringContainer>
  )
}

const StringContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 16.66%;
  width: calc(880px - 54px);

  &:hover {
    cursor: url("/pick.svg") 8 -20, auto;
  }

  .hide-pick {
    transform: scale(0);
    transition: transform 300ms ease;
  }

  .vibrate {
    animation-timing-function: linear;
    animation-duration: 0.1s;
    animation-iteration-count: 15;
    animation-name: vibrate;
    background-color: #5bbad9;

    @keyframes vibrate {
      0% {
        top: 0;
      }
      25% {
        top: -3px;
      }
      50% {
        top: 0;
      }
      75% {
        top: 3px;
      }
      100% {
        top: 0;
      }
    }
  }
`;

const StringLine = styled.div`
  position: relative;
  height: ${p => p.size}px;
  width: 100%;
  background-color: #777777;
  background-image: ${p => p.stripes ? "url('/stripes.svg')" : "none"};
`;

const Pick = styled.div`
  position: absolute;
  content: '';
  width: 14px;
  height: 14px;
  //background-color: #25C8FC;
  border: 2px solid #25C8FC;
  border-radius: 40px;
  left: ${p => p.x}px;
  top: 6px;
`;