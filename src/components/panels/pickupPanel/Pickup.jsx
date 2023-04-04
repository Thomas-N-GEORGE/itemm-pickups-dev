import styled from "styled-components";
import { AppCtx } from "../../../contexts/state";
import { useContext } from "react";



export default function Pickup() {

  const { pickup } = useContext(AppCtx);

  return (
    <>
      <PickupView
        double={pickup.double}
        isMoving={pickup.isMoving}
        position={pickup.position}>
        {renderCircles()}
      </PickupView>
      <PositionLabel
        style={{
          left: pickup.position + (pickup.double ? 10  : -20)
        }}>
        {(pickup.rangeValue * -1) + 170} mm
      </PositionLabel>
    </>

  )
}

function renderCircles() {
  const circles = [];
  for (let i = 0; i < 6; i++) {
    circles.push(<span key={`pu-circle${i+1}`}/>)
  }
  return circles;
}

const PickupView = styled.div`
  position: absolute;
  top: -12px;
  height: 269px;
  width: ${p => p.double ? 108 : 54}px;
  border-radius: ${p => p.double ? 16 : 54}px;
  background-color: #171717;
  border: 1px solid ${p => p.isMoving ? "#25C8FC" : "#525252"};
  left: ${p => p.position}px;
  z-index: ${p => p.isMoving ? 10 : 0};
  box-shadow: ${p => p.isMoving ? "0px 8px 12px rgba(0, 0, 0, 1)" : "inherit"};
  transition: box-shadow 300ms ease;
  padding-top: 21px;
  padding-left: 18px;
  box-sizing: border-box;

  span {
    display: ${p => p.double ? "none" : "block"};
    margin-bottom: 17px;
    height: 14px;
    width: 14px;
    border-radius: 14px;
    background-color: #282828;
    border: 1px solid #6F6F6F;
  }
`;

const PositionLabel = styled.span`
  position: absolute;
  display: inline-block;
  text-align: center;
  width: 60px;
  top: -60px;
  background-color: black;
  color: white;
  border-radius: 40px;
  padding: 6px 16px;
  white-space: nowrap;

  &:before {
    position: absolute;
    left: 46px;
    content: "";
    height: 54px;
    border-left: 1px dashed #565656;
    z-index: -1;
  }
`;