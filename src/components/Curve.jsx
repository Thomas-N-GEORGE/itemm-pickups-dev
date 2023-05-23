import styled from "styled-components";
import { LinePath } from "@visx/shape";
import { curveBasis } from "@visx/curve";
import useWindowDimensions from "../hooks/windowDimensions";

function getCurveWidth() {
  // Todo: adapter la marge suivant les différentes tailles d'écran
  return 1160;
}

export default function Curve({data}) {

  const dataLength = data.length;

  const curveData = createCurveData(data);

  const { window } = useWindowDimensions();

  return (
    <Wrapper>
      <SvgWrapper>
        <svg width={getCurveWidth(window.w)} height={300}>
          <LinePath
            // data={selectedData ? plotsData.values : plotsDataFinal}
            data={curveData}
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

function createCurveData(arr) {
  let res = [];
  for(let i = 0; i < arr.length; i++ ) {
    let y = arr[i] * 300;
    let x = i
    res.push({y: y, x: x})
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