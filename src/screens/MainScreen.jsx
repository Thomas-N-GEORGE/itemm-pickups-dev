import styled from "styled-components";
import InputField from "../components/InputField";
import { useInputValues } from "../hooks/InputsValues";
import { useEffect, useState } from "react";
import { arrayToObj } from "../utils/convert";
import Curve from "../components/Curve";
import compute from "../functions/compute";
import String from "../components/String";

const controls = [
  {
    key: "pickupPosition",
    defaultValue: 12,
    label: "Position du micro (mm)",
    type: "number",
    linked: false,
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
    defaultValue: 1,
    label: "Corde jouée (1/6)",
    type: "number",
    linked: false,
  }
]

export default function MainScreen() {

  const [inputValues, handleInputValuesChange] = useInputValues(
    arrayToObj(controls, "key", "defaultValue")
  )

  const [curveData, setCurveData] = useState([]);


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
        <String size={1} stripes={false} handleChange={handleInputValuesChange}/>
        <String size={1.2} stripes={false} handleChange={handleInputValuesChange}/>
        <String size={1.4} stripes={false} handleChange={handleInputValuesChange}/>
        <String size={1.8} stripes={true} handleChange={handleInputValuesChange}/>
        <String size={2} stripes={true} handleChange={handleInputValuesChange}/>
        <String size={2.4} stripes={true} handleChange={handleInputValuesChange}/>
      </Strings>

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
  margin: 42px;
  &:hover {
    cursor: url("/pick.svg") 8 -20, auto;
  }
`

const InputSection = styled.div`
  margin: 42px;
`;

const ResultSection = styled.div`
  margin: 60px 42px;
`;

