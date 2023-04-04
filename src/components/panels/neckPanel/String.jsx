import styled from "styled-components";
import { useContext } from "react";
import { AppCtx } from "../../../contexts/state";

export default function String({settings}) {

  const { strings } = useContext(AppCtx);

  const {
    size,
    stripes,
    name
  } = settings;

  return (
    <Wrapper
      stripes={stripes}
      size={size}>
      <div className={strings.vibrating === name ? 'vibrate' : 'chill'}></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 16.66%;
  width: 100%;
  
  div {
    position: relative;
    width: 100%;
    height: ${({size}) => size}px;
    background-color: #777777;
    background-image: ${p => p.stripes ? "url('/stripes.svg')" : "none"};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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