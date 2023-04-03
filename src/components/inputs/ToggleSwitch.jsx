import styled from "styled-components";
import { useState } from "react";
import useSound from 'use-sound';
export default function ToggleInput({label, handleChange}) {

  const [play] = useSound('/sounds/switch-off.mp3');

  const [active, setActive] = useState(false);

  const handleClick = () => {
    play();
    handleChange("pickupType", active ? "simple" : "double");
    setActive(!active);
  }

  return (
    <Wrapper>
      <ToggleButton
        active={active}
        onClick={() => handleClick()}>
        <div className={"toggle-surface"}>
          <span className={"mark-o"}></span>
          <span className={"mark-i"}></span>
        </div>
      </ToggleButton>
      <ToggleLabel>{label}</ToggleLabel>
    </Wrapper>

  )

}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  z-index: 12;
`;

const ToggleLabel = styled.p`
  color: white;
  line-height: 28px;
`;

const ToggleButton = styled.div`
  position: relative;
  height: 28px;
  width: 60px;
  background-color: #F3EDE8;
  border-radius: 19px;
  cursor: pointer;
  
  
  .toggle-surface {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding-left: 12px;
    padding-right: 12px;
    align-items: center;
    top: 0;
    left: ${({active}) => active ? 4 : 0}px;
    height: 28px;
    width: 55px;
    background: ${({active}) => !active ?
      "linear-gradient(90deg, #242424 27.19%, #0E0E0E 116.55%)" :
      "linear-gradient(90deg, #0F0F0F -7.02%, #292929 68.42%);"      
    };
    border: 1px solid #F3EDE8;
    border-radius: 19px;
    transition: all 300ms ease;

    .mark-i {
      height: 10px;
      width: 1px;
      border-left: 1px solid ${({active}) => active ? "#25C8FC" : "#F3EDE8"};
    }

    .mark-o {
      height: 10px;
      width: ${({active}) => !active ? 10 : 7}px;
      border-radius: 10px;
      border: 1px solid #F3EDE8;
      transition: all 300ms ease;
    }
  }
  
`;