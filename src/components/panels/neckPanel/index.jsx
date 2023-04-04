import styled from "styled-components";
import { useContext } from "react";
import { AppCtx } from "../../../contexts/state";
import { stringSettings } from "../../../settings";
import String from "./String";

function createBoxes() {
  let arr = new Array(126);
  let cnt = 0;
  for (let x = 0; x < 21; x++) {
    for (let y = 0; y < 6; y++) {
      arr[cnt] = {
        x: x,
        y: y,
      }
      cnt++;
    }
  }
  return arr;
}

function renderNumbers() {
  const cols = []
  for (let i = 0; i < 21; i++) {
    cols.push(<span key={`nbr-${i+1}`}>{i+1}</span>);
  }
  return cols;
}

const dotPositions = [
  "22", "24", "26", "29", "111", "311", "214", "216", "218", "220",
]

export default function NeckPanel({isActive}) {

  // console.log("Rendering: NeckPanel")

  // todo: utiliser le hook dimension
  const boxWidth = 1200 / 21;
  const boxHeight = 200 / 6;

  const boxes = createBoxes()

  const { notes, update } = useContext(AppCtx);

  const handleBoxClick = (box) => {
    let nextNotes = notes;
    if (notes[box.y] === box.x) {
      nextNotes[box.y] = -1;
    } else {
      nextNotes[box.y] = box.x;
    }
    update("notes", [...nextNotes]);
  }

  return (
    <Wrapper style={{left: `${isActive ? 0 : -1200}px`}}>
      <div className={"neck-background"}/>
      <Boxes>
        { boxes.map((box, key) =>
          ( <Box
              style={{
                top: box.y * boxHeight,
                left: box.x * boxWidth,
                width: boxWidth,
                height: boxHeight,
                borderRight: box.x > 19 ? "none" : "0.8px solid #434343"
              }}
              key={key}
              selected={notes[box.y] === box.x}
              onClick={() => handleBoxClick(box)}>
              {
                dotPositions.includes(box.y.toString() + box.x.toString()) &&
                <div className={"dot"}/>
              }
            </Box>
          ))
        }
      </Boxes>
      <Strings>
        {stringSettings.map((str, key) => <String key={key} settings={str}/>)}
      </Strings>
      <div className={"neck-numbers"}>
        {renderNumbers()}
      </div>
      <div className={"nut"}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 1200px;
  height: 200px;
  transition: left 600ms ease;

  .neck-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #101010;
    border: 1px solid #262626;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 0;
  }

  .nut {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    border-radius: 2px;
    background-color: #7E7E7E;
  }

  .neck-numbers {
    position: absolute;
    top: 200px;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;

    span {
      font-size: 12px;
      margin-top: 16px;
      text-align: center;
      width: 4.76%;
      color: rgba(255, 255, 255, 0.72);
    }
  }
`;

const Strings = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Boxes = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  z-index: 2;
`;

const Box = styled.div`
  z-index: 1;
  position: absolute;
  border-right: 0.8px solid #434343;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    position: relative;
    content: '';
    border: 2px solid ${({selected}) => selected ? "#25C8FC" : "transparent"};
    background-color: ${({selected}) => selected ? "#25C8FC" : "transparent"};;
    border-radius: 40px;
    width: 14px;
    height: 14px;
  }

  &:hover {
    &:before {
      background-color: rgba(244, 244, 244, 0.6);
    }
  }

  .dot {
    position: absolute;
    bottom: -6px;
    left: calc(50% - 6px);
    border-radius: 12px;
    width: 12px;
    height: 12px;
    background-color: #424242;
  }
`;