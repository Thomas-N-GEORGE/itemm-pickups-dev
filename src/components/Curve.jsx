import styled from "styled-components";
import { LinePath } from "@visx/shape";
import { curveBasis } from "@visx/curve";
import { useState } from "react";
import useWindowDimensions from "../hooks/windowDimensions";

function getCurveWidth() {
  // Todo: adapter la marge suivant les différentes tailles d'écran
  return 1160;
}

export default function Curve({data}) {

  const dataLength = data.length;
  // const max = Math.max(...data);
  // const min = Math.min(...data);
  const max = 1;
  const min = -1;

  const diff = max - min;
  // const increaseRatio = diff / dataLength;

  const [plotsData, setPlotData] = useState({
    // values: stringArrToObjects(data, false, increaseRatio, min),
    values: [],
    end: false
  });

  const plotsDataFinal = stringArrToObject2(data, false);
  // const [doAnimation, setDoAnimation] = useState(false)

  const { window } = useWindowDimensions();

  // const maxWidth = Math.max(...data) * ( getCurveWidth() / 1200 )
  // const maxWidth = getCurveWidth() / 1160;

  function animate() {
    let end = true
    let newPlots = plotsData.values.map((plot, key) => {
      if (plot.y !== Math.round(plotsDataFinal[key].y)) {
        end = false;
        let next = plotsDataFinal[key].y > plot.y ? +1 : -1;
        return {y: plot.y + next, x: plot.x}
      }
      return plot;
    })
    setPlotData({values: newPlots, end: end});
  }

  return (
    <Wrapper>
      <SvgWrapper>
        <svg width={getCurveWidth(window.w)} height={300}>
          <LinePath
            // data={selectedData ? plotsData.values : plotsDataFinal}
            data={plotsDataFinal}
            curve={curveBasis}
            x={(d) => ( d.x * ( getCurveWidth(window.w) / dataLength ) )}
            y={(d) => d.y * ( getCurveWidth(window.w) / 1160 )}
            stroke="#F3EDE8"
            strokeWidth={0.6}
            strokeOpacity={0.8}
          />
        </svg>
      </SvgWrapper>
    </Wrapper>
  );
}

function stringArrToObjects(arr, init) {

  let res = []
  for (const value in arr) {
    let newY = arr[value];
    let newX = value
    if(init) {
      // newX = value * 2 - start;
      newX = value
    }
    if(init && value > 0 && value < arr.length-1 ){
      // newY = value * ir + min;
      newY = 100;
    }
    if(init) {
      newY = 0;
    }
    res.push({y: newY, x: newX})
  }
  return res;
}

function stringArrToObject2(arr, init) {
  let res = [];
  for(let i = 0; i < arr.length; i++ ) {
    let newY = arr[i] * 300;
    let newX = i
    if(init) {
      // newX = value * 2 - start;
      newX = i
    }
    if(init && i > 0 && i < arr.length-1 ){
      // newY = value * ir + min;
      newY = 300;
    }
    if(init) {
      newY = 0;
    }
    res.push({y: newY, x: newX})
  }
  return res;
}


const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 1200px;
  //padding-bottom: 80px;
  padding: 20px;
  box-sizing: border-box;
  margin: 90px auto auto auto;
  z-index: 12;
  background-color: rgba(51, 51, 51, 0.1);
  border: 1px solid #1a1a1a;
  border-radius: 21px;
  box-shadow: 5px 5px 25px 5px rgba(0,0,0,0.45);
  background-image: url('/grid.png');

  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    background-color: rgba(14, 14, 14, 0.4);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
  }
`;

const SvgWrapper = styled.div`
  //.visx-linepath {
  //  transition: 1.2s cubic-bezier(.8,.03,.13,1.4)
  //}
`;