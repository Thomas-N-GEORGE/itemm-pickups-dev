import styled from "styled-components";
import { useEffect, useState } from "react";


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

export default function NeckAlt() {

  const boxWidth = 1200 / 21;
  const boxHeight = 200 / 6;

  const boxes = createBoxes();

  const [selectedNotes, setSelectedNotes] = useState({
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  })

  const handleBoxClick = (box) => {
    setSelectedNotes(prevState => ({...prevState, [box.y]: box.x}) )
  }

  useEffect(() => {
    console.log("HOOOOOOO");
  }, [selectedNotes])

  return (
    <Wrapper>
      {boxes.map((box, key) =>
        ( <Box
            style={{
              top: box.y * boxHeight,
              left: box.x * boxWidth,
              width: boxWidth,
              height: boxHeight
            }}
            key={key}
            selected={selectedNotes[box.y] === box.x}
            onClick={() => handleBoxClick(box)}
          />
        ))
      }
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: relative;
  margin: auto;
  width: 1200px;
  height: 200px;
`;

const Box = styled.div`

  position: absolute;
  background-color: green;
  border: 1px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    position: relative;
    content: '';
    background-color: ${p => p.selected ? "blue" : "transparent"};
    border-radius: 40px;
    width: 30px;
    height: 30px;
  }

  &:hover {
    &:before {
      background-color: red;
    }
  }

`;
