import styled from "styled-components";
import { LinePath } from "@visx/shape";
import { curveBasis } from "@visx/curve";
import Axes from "./Axes";

export default function Curve({data}) {

  const dataLength = data.length;

  const curveData = createCurveData(data);

  return (
    <Wrapper>
      <SvgWrapper>
        <svg width={1080} height={300}>
          <LinePath
            // data={selectedData ? plotsData.values : plotsDataFinal}
            data={curveData}
            curve={curveBasis}
            x={(d) => ( d.x * ( 1080 / dataLength ) )}
            y={(d) => d.y}
            stroke="#25C8FC"
            strokeWidth={0.8}
            strokeOpacity={0.8}
          />
        </svg>
        <Axes direction="left" range={300} dividers={5} />
      </SvgWrapper>
    </Wrapper>
  );
}

function createCurveData(arr) {
  let res = [];
  for(let i = 0; i < arr.length; i++ ) {
    let y = arr[i] * 300;
    res.push({y: y, x: i})
  }
  return res;
}


const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 1200px;
  padding: 60px;
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