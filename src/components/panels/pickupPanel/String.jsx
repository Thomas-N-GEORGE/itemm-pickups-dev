import styled from "styled-components";
import { useContext, useState } from "react";
import useWindowDimensions from "../../../hooks/windowDimensions";
import { AppCtx } from "../../../contexts/state";


export default function String({settings}) {

  const {strings, update} = useContext(AppCtx);

  const [crosshairX, setCrosshairX] = useState(0);
  const [showCrosshair, setShowCrosshair] = useState(false);

  const { size, name, stripes } = settings;

  const { window, scale } = useWindowDimensions();

  const handleMouseEnter = (e) => {
    // distance de la corde à gauche de l'écran
    let ld = (window.w - (1200 * scale)) / 2;
    let cx = (e.clientX - ld) / scale;
    cx = Math.trunc(cx);
    setCrosshairX(cx);
    setShowCrosshair(true);
  }

  const handleMouseMove = (e) => {
    // distance de la corde à gauche de l'écran
    let ld = (window.w - (1200 * scale)) / 2;
    let cx = (e.clientX - ld) / scale;
    cx = Math.trunc(cx);
    setCrosshairX(cx);
  }

  const handleMouseLeave = () => {
    setShowCrosshair(false);
  }


  const onClick = (e) => {

    let leftMargin = ((window.w - 1200) / 2);
    let excitementPosition = Math.trunc(170 - ((e.clientX - leftMargin) * (170 / (880 - 54) )) ) + 1

    update( "strings",
      { ...strings,
        "vibrating": name,
        "selected": name,
        "crosshairPosition": crosshairX,
        "excitementPosition": excitementPosition
      })

    setTimeout(() => {
      update("strings", {...strings, vibrating: null});
    }, 1500)
  }

  return(
    <Wrapper
      onClick={(e) => onClick(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={handleMouseLeave}>
      <StringLine
        size={size}
        stripes={stripes}
        className={strings.vibrating === name ? 'vibrate' : 'chill'}
      />
      { showCrosshair &&
        <Crosshair
          style={{left: crosshairX}}
          className={strings.vibrating === name ? 'hide-pick' : 'chill'}
        />
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

const Crosshair = styled.div`
  position: absolute;
  content: '';
  width: 14px;
  height: 14px;
  border: 2px solid #25C8FC;
  border-radius: 40px;
  top: 7px;
`;