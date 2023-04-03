import styled from "styled-components";
import { useInputValues } from "../hooks/InputsValues";
import { useEffect, useState } from "react";
import { arrayToObj } from "../utils/arrays";
import Curve from "../components/Curve";
import compute from "../functions/compute";
import PickupString from "../components/strings/PickupString";
import PickupSlider from "../components/Slider";
import Neck from "../components/Neck";
import { controls, strings } from "../settings"
import ControlValueRow from "../components/ControlValueRow";
import ToggleInput from "../components/inputs/ToggleSwitch";



export default function MainScreen() {

  const [isPickupMoving, setIsPickupMoving] = useState();
  const [neckActive, setNeckActive] = useState(true);

  const [inputValues, handleInputValuesChange, handleInputValuesChanges] = useInputValues(
    arrayToObj(controls, "key", "defaultValue")
  )

  const [curveData, setCurveData] = useState([]);

  useEffect(() => {
    setCurveData(compute(inputValues));
  }, [inputValues])

  const switchPanel = () => {
    setNeckActive(!neckActive);
  }

  const getPickupPosition = () => {
    const pickupSize = inputValues["pickupType"] === "double" ? 108 : 54;
    return inputValues["pickupPosition"] * ((880 - pickupSize - 54) / 170 );
  }

  return (
    <PageWrapper>
      <ControlHead>
        <PanelSwitch
          onClick={() => switchPanel()}>
          <PanelButton active={neckActive} className={"switch-panel_neck"}>NOTES</PanelButton>
          <PanelButton active={!neckActive} className={"switch-panel_pickup"}>MICRO</PanelButton>
        </PanelSwitch>
        <ToggleInput label={"Micro double"} handleChange={handleInputValuesChange}/>
      </ControlHead>


      <ControlSection isNeckActive={neckActive}>

        <GuitarBackground
          isNeckActive={neckActive}
          src={'/guitar-body.svg'}/>

        <GuitarNeck
          isNeckActive={neckActive}
          src={'/guitar-neck.svg'}/>

        <Neck
          active={neckActive}
          handleChange={handleInputValuesChange}/>

        <Strings
          style={{
            left: `${neckActive ? 1200 : 0}px`}}>
          <Pickup
            type={inputValues["pickupType"]}
            isMoving={isPickupMoving}
            position={getPickupPosition()}>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
          </Pickup>

          { strings.map((str, key) =>
            <PickupString
              key={key}
              settings={str}
              handleChange={handleInputValuesChanges}/>
          )}

          <Bridge/>

          <div className={"control-bottom"}>
            <PickupSlider
              pickupType={inputValues["pickupType"]}
              setIsMoving={setIsPickupMoving}
              handleChange={handleInputValuesChange}/>
          </div>
        </Strings>
      </ControlSection>

      <ResultSection>
        <Curve data={curveData}/>
      </ResultSection>

      <ControlValues>
        <h2>Controls</h2>
        { controls.map((control, key) =>
          <ControlValueRow
            key={key}
            label={control.label}
            type={control.type}
            value={inputValues[control.key]}>
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
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin: auto;
  height: 260px;
  width: 1200px;
  overflow: visible;
`

const Strings = styled.div`
  position: absolute;
  left: 0;
  width: 880px;
  height: 200px;
  transition: left 600ms ease;

  .control-bottom {
    width: 100%;
    height: 60px;
  }
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

const Bridge = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 54px;
  background-image: url('/bridge.svg');
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: contain;
  z-index: 10;
`

const Pickup = styled.div`
  position: absolute;
  top: -12px;
  height: 269px;
  width: ${({type}) => type === "double" ? 108 : 54}px;
  border-radius: ${({type}) => type === "double" ? 16 : 54}px;
  background-color: #171717;
  border: 1px solid ${p => p.isMoving ? "#25C8FC" : "#525252"};
  left: ${p => p.position }px;
  z-index: ${p => p.isMoving ? 10 : 0};
  box-shadow: ${p => p.isMoving ? "0px 8px 12px rgba(0, 0, 0, 1)" : "inherit"};
  transition: box-shadow 300ms ease;
  padding-top: 21px;
  padding-left: 18px;
  box-sizing: border-box;
  
  span {
    display: ${({type}) => type === "double" ? "none" : "block"};
    margin-bottom: 17px;
    height: 14px;
    width: 14px;
    border-radius: 14px;
    background-color: #282828;
    border: 1px solid #6F6F6F;
  }
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
  z-index: 10
`;

const PanelButton = styled.span`
  margin-right: 18px;
  opacity: ${({active}) => active ? 1 : 0.66};
  font-weight: ${({active}) => active ? 600 : 400};
  letter-spacing: 1px;
`;

const GuitarBackground = styled.img`
  position: absolute;
  top: -470px;
  left: ${({isNeckActive}) => isNeckActive ? 800 : -400}px;
  z-index: -1;
  transition: left 600ms ease;
`;

const GuitarNeck = styled.img`
  position: absolute;
  top: -130px;
  right: ${({isNeckActive}) => isNeckActive ? 1200 : -2400}px;
  z-index: -1;
  transition: left 600ms ease;
`

