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

  return (
    <PageWrapper>

      <ResultSection>
        <h2>Résultats</h2>
        <Curve data={curveData}/>
      </ResultSection>

      <PanelSwitch
        onClick={() => switchPanel()}>
        <PanelButton active={neckActive} className={"switch-panel_neck"}>NOTES</PanelButton>
        <PanelButton active={!neckActive} className={"switch-panel_pickup"}>MICRO</PanelButton>
      </PanelSwitch>/

      <ControlSection>
        <Neck
          active={neckActive}
          handleChange={handleInputValuesChange}/>
        <Strings
          style={{
            left: `${neckActive ? 1200 : 0}px`
          }}>

          <Pickup
            isMoving={isPickupMoving}
            position={inputValues["pickupPosition"] * ((1200 - 134) / 170 )}/>

            { strings.map((str, key) =>
              <PickupString
                key={key}
                settings={str}
                handleChange={handleInputValuesChanges}/>
            )
          }

          <Bridge/>
          <div className={"control-bottom"}>
            <PickupSlider
              setIsMoving={setIsPickupMoving}
              handleChange={handleInputValuesChange}/>
          </div>
        </Strings>
      </ControlSection>

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
  h2 {
    color: #f4f4f4;
  }
`;

const ControlSection = styled.div`
  position: relative;
  margin: auto;
  height: 260px;
  width: 1200px;
  overflow: hidden;
`

const Strings = styled.div`
  position: absolute;
  left: 0;
  width: 1200px;
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
  margin: 60px 42px;
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
  top: 0;
  height: 100%;
  width: 80px;
  border-radius: 12px;
  background-color: ${p => p.isMoving ? "rgba(6,27,33,0.8)" : "#282828"};
  border: 1px solid ${p => p.isMoving ? "#25C8FC" : "#525252"};
  left: ${p => p.position }px;
  z-index: ${p => p.isMoving ? 10 : 0};
  box-shadow: ${p => p.isMoving ? "0px 8px 12px rgba(0, 0, 0, 1)" : "inherit"};
  transition: box-shadow 300ms ease;
`;

const PanelSwitch = styled.div`
  position: relative;
  cursor: pointer;
  color: white;
  margin-left: calc((100% - 1200px) / 2);
`;

const PanelButton = styled.span`
  margin-right: 18px;
  opacity: ${({active}) => active ? 1 : 0.66};
  font-weight: ${({active}) => active ? 600 : 400};
  letter-spacing: 1px;
`;

