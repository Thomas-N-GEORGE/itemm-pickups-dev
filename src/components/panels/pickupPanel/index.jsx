import styled from "styled-components";
import PickupSlider from "../../Slider";
import { stringSettings } from "../../../settings";
import String from "./String";
import Bridge from "./Bridge";
import Pickup from "./Pickup";
import { useContext } from "react";
import { AppCtx } from "../../../contexts/state";


const notesMapY = {
  "E": 120,
  "A": 155,
  "D": 189,
  "G": 220,
  "B": 255,
  "E2": 289,
}

export default function PickupPanel({isActive}) {

  const {controlValues} = useContext(AppCtx);

  return (
    <Wrapper style={{left: `${isActive ? 0 : 1200}px`}}>
      <Pickup/>

      {stringSettings.map((str, key) =>
        <String key={key} settings={str}/>
      )}

      <Bridge/>

      <PickPositionLabel style={{left: controlValues.crosshairPosition - 35}}>
        {controlValues.excitementPosition} mm
        <div className={"crosshair-line"} style={{height: notesMapY[controlValues.selectedString]}}/>
      </PickPositionLabel>

      <div className={"panel-bottom"}>
        <PickupSlider/>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 880px;
  height: 200px;
  transition: left 600ms ease;
`;

const PickPositionLabel = styled.span`
  position: absolute;
  display: inline-block;
  text-align: center;
  width: 60px;
  bottom: -106px;
  background-color: black;
  color: white;
  border-radius: 40px;
  padding: 6px 16px;
  white-space: nowrap;
  transition: all 300ms ease;

  .crosshair-line {
    position: absolute;
    left: 45px;
    bottom: 0;
    width: 0;
    content: "";
    height: 260px;
    border-left: 1px dashed #565656;
    z-index: -1;
  }
`;