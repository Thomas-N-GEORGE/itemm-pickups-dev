import styled from "styled-components";
import { useEffect, useRef, useState } from "react";


export default function NeckCanvas() {

  let ctx = null;
  let canvas = null;
  const canvasRef = useRef(null);
  const fretArray = [];
  const boxArray = [];

  const boxWidth = 1200 / 21;
  const boxHeight = 200 / 6;

  const [notes, setNotes] = useState([0,0,0,0,0,0]);

  const [hoveredNote, setHoveredNote] = useState(null);

  useEffect(() => {

    canvas = canvasRef.current;
    canvas.width = 1200;
    canvas.height = 200;

    ctx = canvas.getContext("2d");

    canvas.onmousemove = (e) => {

      let rect = canvas.getBoundingClientRect();
      let cursorPosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCanvas(cursorPosition)
    }

    drawCanvas(null);

  }, [])


  /**
   * Fret
   * @param {number} x numéro de la frette
   */
  class Fret {
    constructor(x) {
      this.x = x * 1200 / 21;
    }
    draw() {
      ctx.strokeStyle = "rgb(93,93,93)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(this.x,0)
      ctx.lineTo(this.x,200)
      ctx.stroke()
    }
  }

  /**
   * Box
   * @param {number} string numéro de la corde
   * @param {number} fret   numéro de la frette
   */
  class Box {

    constructor(x, y) {
      this.fret = x;
      this.string = y;
      this.x = Math.round(x * boxWidth);
      this.y = Math.round(y * boxHeight);
    }
    draw(cursor) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, boxWidth, boxHeight);
      let hovered = cursor && ctx.isPointInPath(cursor.x, cursor.y);
      if(hovered) {
        setHoveredNote({x: this.fret, y: this.string});
      }
      let selected = notes[this.string] === this.fret;
      ctx.lineWidth = "1";
      ctx.strokeStyle = selected ? "orange" : hovered ? "red" :  "blue";
      ctx.stroke()
    }
  }

  const drawCanvas = (cursorPositon) => {
    let boxCnt = 0;
    for(let i=0 ; i<21 ; i++) {
      fretArray.push(new Fret(i));
      fretArray[i].draw();
      for(let j=0; j<6 ; j++) {
        boxArray.push(new Box(i,j));
        boxArray[boxCnt].draw(cursorPositon);
        boxCnt++;
      }
    }
  }

  useEffect(() => {
  }, [notes])

  const handleClick = () => {
    let newNotes = notes;
    newNotes[hoveredNote.y] = hoveredNote.x;
    setNotes(newNotes)
  }

  return (
    <Wrapper onClick={() => handleClick()}>
      <canvas ref={canvasRef} />
    </Wrapper>
  )

}

const Wrapper = styled.div`
  margin: auto;
  width: 1200px;
  height: 200px;
  border: 1px solid rgba(250, 128, 114, 0.32);
`;