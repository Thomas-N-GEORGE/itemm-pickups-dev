import styled from "styled-components";
import InputField from "../components/InputField";
import { useInputValues } from "../hooks/InputsValues";
import { useEffect, useState } from "react";
import { arrayToObj } from "../utils/convert";
import Curve from "../components/Curve";
import compute from "../functions/compute";

const controls = [
  {
    key: "pickupPosition",
    defaultValue: 12,
    label: "Position du micro (cm)",
    type: "number",
  },
  {
    key: "excitementPosition",
    defaultValue: 18,
    label: "Position d'excitation (cm)",
    type: "number"
  },
  {
    key: "pickupType",
    defaultValue: "simple",
    label: "Type de micro (simple/double)",
    type: "text",
  },
  {
    key: "stringLength",
    defaultValue: 32,
    label: "Longueur de corde (cm)",
    type: "number"
  },
  {
    key: "selectedString",
    defaultValue: 1,
    label: "Corde jouée (1/6)",
    type: "number"
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

      <InputSection>
        <h2>Controls</h2>
        { controls.map((control, key) =>
          <InputField
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

const InputSection = styled.div`
  margin: 42px;
`;

const ResultSection = styled.div`
  margin: 60px 42px;
`;

