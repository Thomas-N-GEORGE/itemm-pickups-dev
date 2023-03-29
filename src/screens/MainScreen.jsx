import styled from "styled-components";
import InputField from "../components/InputField";
import { useInputValues } from "../hooks/InputsValues";
import { useEffect, useState } from "react";
import { arrayToObj } from "../utils/convert";
import Curve from "../components/Curve";
import compute from "../functions/compute";
import String from "../components/String";
import PickupSlider from "../components/Slider";
import useWindowDimensions from "../hooks/windowDimensions";


const strings = [
  { name: "E2", size: 1, stripes: false},
  { name: "B", size: 1.4, stripes: false},
  { name: "G", size: 1.8, stripes: false},
  { name: "D", size: 2, stripes: true},
  { name: "A", size: 2.2, stripes: true},
  { name: "E", size: 2.4, stripes: true},
]
const controls = [
  {
    key: "pickupPosition",
    defaultValue: 12,
    label: "Position du micro (mm)",
    type: "number",
    linked: true,
  },
  {
    key: "excitementPosition",
    defaultValue: 100,
    label: "Position d'excitation (mm)",
    type: "number",
    linked: true,
  },
  {
    key: "pickupType",
    defaultValue: "simple",
    label: "Type de micro (simple/double)",
    type: "text",
    linked: false,
  },
  {
    key: "stringLength",
    defaultValue: 32,
    label: "Longueur de corde (mm)",
    type: "number",
    linked: false,
  },
  {
    key: "selectedString",
    defaultValue: "E",
    label: "Corde jouée (1/6)",
    type: "text",
    linked: true,
  }
]

export default function MainScreen() {

  const [isPickupMoving, setIsPickupMoving] = useState();

  const [inputValues, handleInputValuesChange, handleInputValuesChanges] = useInputValues(
    arrayToObj(controls, "key", "defaultValue")
  )

  const [curveData, setCurveData] = useState([]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    setCurveData(compute(inputValues));
  }, [inputValues])

  return (
    <PageWrapper>

      <ResultSection>
        <h2>Résultats</h2>
        <Curve data={curveData}/>
      </ResultSection>

      <Strings>
        <Pickup
          isMoving={isPickupMoving}
          position={inputValues["pickupPosition"] * ((width - 204) / 170 )} />
        { strings.map((str, key) =>
            <String
              key={key}
              settings={{name: str.name, size: str.size, stripes: str.stripes}}
              handleChange={handleInputValuesChanges}/>
          )
        }
        <Bridge/>
      </Strings>

      <PickupSlider
        setIsMoving={setIsPickupMoving}
        handleChange={handleInputValuesChange}/>

      <InputSection>
        <h2>Controls</h2>
        { controls.map((control, key) =>
          <InputField
            linkedValue={control.linked ? inputValues[control.key] : null}
            key={key}
            type={control.type}
            label={control.label}
            inputKey={control.key}
            defaultValue={control.defaultValue}
            handleChange={handleInputValuesChange}
          />
        )}
      </InputSection>

    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  h2 {
    color: #f4f4f4;
  }
`;

const Strings = styled.div`
  position: relative;
  margin: 42px 42px 0 42px;
  &:hover {
    cursor: url("/pick.svg") 8 -20, auto;
  }
`

const InputSection = styled.div`
  margin: 42px 42px;
`;

const ResultSection = styled.div`
  margin: 60px 42px;
`;

const Bridge = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 50px;
  background-image: url('/bridge.svg');
  background-repeat: no-repeat;
  background-position: 15px 0;
  background-size: contain;
  z-index: 10;
`

const Pickup = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 80px;
  border-radius: 12px;
  background-color: #282828;
  opacity: ${p => p.isMoving ? 0.8 : 1};
  border: 1px solid ${p => p.isMoving ? "#25C8FC" : "#525252"};
  //background-color: ${p => p.isMoving ? "green" : "red"};
  left: ${p => p.position }px;
  z-index: ${p => p.isMoving ? 10 : 0};
  box-shadow: ${p => p.isMoving ? "0px 8px 12px rgba(0, 0, 0, 1)" : "inherit"};
  transition: box-shadow 300ms ease;
`;

