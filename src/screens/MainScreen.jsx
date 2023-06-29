import styled from "styled-components";
import { useContext, useState } from "react";
import Curve from "../components/Curve";
import { controlSettings } from "../settings"
import ControlValueRow from "../components/ControlValueRow";
import ToggleInput from "../components/inputs/ToggleSwitch";
import { PickupPanel } from "../components/panels";
import { AppCtx } from "../contexts/state";
import NeckPanel from "../components/panels/neckPanel";
import useWindowDimensions from "../hooks/windowDimensions";

export default function MainScreen() {

  const {scale} = useWindowDimensions();

  const {
    pickup,
    controlValues,
    sound,
    update
  } = useContext(AppCtx);

  const [neckActive, setNeckActive] = useState(true);

  const switchPanel = () => {
    setNeckActive(!neckActive);
  }

  const changePickup = (double) => {
    let size = double ? 108 : 54;
    update("pickup", {
      ...pickup,
      double: double,
      position: pickup.rangeValue * ( ( 880 - size - 54 ) / 170 )
    })
  }

  return (
    <PageWrapper>
      <ControlHead>
        <PanelSwitch
          onClick={() => switchPanel()}>
          <PanelButton active={neckActive} className={"switch-panel_neck"}>NOTES</PanelButton>
          <PanelButton active={!neckActive} className={"switch-panel_pickup"}>MICRO</PanelButton>
        </PanelSwitch>

        {/* TODO: Ce bouton serait probablement mieux placé à côté dans la zone libre à côté du chevalet */}
        <ToggleInput
          label={"Micro double"}
          onToggle={(value) => changePickup(value)}/>
      </ControlHead>


      <ControlSection isNeckActive={neckActive} scale={scale}>
        <GuitarBackground
          isNeckActive={neckActive}
          src={"/guitar-body.svg"}/>
        <GuitarNeck
          isNeckActive={neckActive}
          src={"/guitar-neck.svg"}/>
        <NeckPanel isActive={neckActive}/>
        <PickupPanel isActive={!neckActive}/>
      </ControlSection>

      <ResultSection>
        <Curve data={sound.frequencies}/>
      </ResultSection>

      <ControlValues>
        <h2>Controls</h2>
        {controlSettings.map((control, key) =>
          <ControlValueRow
            key={key}
            label={control.label}
            type={control.type}
            value={controlValues[control.key]}>
          </ControlValueRow>
        )}
      </ControlValues>

    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;

  h2 {
    color: #f4f4f4;
  }
`;

const ControlSection = styled.div`
  //position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin: auto;
  height: 260px;
  width: 1200px;
  overflow: visible;
  transform: scale(${({scale}) => scale});
`

const ControlValues = styled.div`
  width: 1200px;
  margin: 80px auto;
`;

const ResultSection = styled.div`
  position: relative;
  width: 1200px;
  margin: 30px auto 96px auto;
`;


const ControlHead = styled.div`
  margin: 42px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PanelSwitch = styled.div`
  position: relative;
  cursor: pointer;
  color: white;
  margin-left: calc((100% - 1200px) / 2);
  z-index: 10;
  border: 1px solid white;
  border-radius: 40px;
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2px;
`;

const PanelButton = styled.div`
  letter-spacing: 1px;
  font-size: 14px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${({active}) => active ? "white" : "transparent" };
  color: ${({active}) => active ? "#000000" : "#EEEEEE" };
  font-weight: ${({active}) => active ? 600 : 400};
  padding: 0 18px;
`;

const GuitarBackground = styled.img`
  position: absolute;
  top: -470px;
  left: ${({isNeckActive}) => isNeckActive ? 800 : -400}px;
  z-index: -1;
  transition: left 600ms ease;
  user-select: none;
  -webkit-user-drag: none;
`;

const GuitarNeck = styled.img`
  position: absolute;
  top: -130px;
  right: ${({isNeckActive}) => isNeckActive ? 1200 : -2400}px;
  z-index: -1;
  transition: left 600ms ease;
`

