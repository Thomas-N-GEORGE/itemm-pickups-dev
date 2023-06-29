import styled from "styled-components";
import { axesSettings } from "../settings";

function createSteps(rangeMin, rangeMax, dividers) {

  let res = [];

  for(let i = 1 ; i < dividers + 1 ; i++) {
    res.push({
      label: (rangeMax / dividers) * i + rangeMin,
    });
  }
  return res;
}

export default function Axes() {

  const {
    unit: xUnit,
    min: xMin,
    max: xMax,
    dividers: xDividers
  } = axesSettings.x;


  const {
    unit: yUnit,
    min: yMin, max: yMax,
    dividers: yDividers
  } = axesSettings.y;


  const stepsX = createSteps(xMin, xMax, xDividers);

  const stepsY = createSteps(yMin, yMax, yDividers);


  return(
    <Wrapper>
      <AxisLeft>
        <span className={"unit"}>{yUnit}</span>
        {stepsX.map((step, key) => renderStep(step, key))}
      </AxisLeft>
      <AxisBottom>
        <span className={"unit"}>{xUnit}</span>
        {stepsY.map((step, key) => renderStep(step, key))}
      </AxisBottom>
    </Wrapper>
  )
}

function renderStep(step, key) {
  return(
    <div key={key} className={'axe-step'}>
      <span>{step.label}</span>
    </div>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 60px;
  left: 60px;
  height: 300px;
  width: calc(100% - 100px);
  border-left: 1px dashed rgba(238, 238, 238, 0.3);
  border-bottom: 1px dashed rgba(238, 238, 238, 0.3);
`;

const AxisLeft = styled.div`
  position: absolute;
  left: -50px;
  top: 0;
  width: 40px;
  height: 100%;
  
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  
  .unit {
    position: absolute;
    top: 10px;
    left: 50px;
    transform: rotate(-90deg);
    color: #6e6e6e;
    text-wrap: none;
  }
  
  .axe-step {
    position: relative;
    flex-grow: 1;
    line-height: 0;
    font-size: 11px;
    text-align: right;
    color: rgba(238, 238, 238, 0.6);
    width: 40px;

    span {
      &:after {
        position: absolute;
        top: -1px;
        content: " —";
      }
    }
  }
`;

const AxisBottom = styled.div`
  position: absolute;
  left: 0;
  bottom: -30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
  width: 100%;


  .unit {
    position: absolute;
    right: 0;
    bottom: 40px;
    color: #6e6e6e;
  }

  .axe-step {
    flex-grow: 1;
    position: relative;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    text-align: right;
    color: rgba(238, 238, 238, 0.6);
    width: 40px;

    &:after {
      position: absolute;
      top: -15px;
      right: -5px;
      content: " —";
      transform: rotate(-90deg);
    }

    span {
      margin-right: -10px;
    }
  }
`;