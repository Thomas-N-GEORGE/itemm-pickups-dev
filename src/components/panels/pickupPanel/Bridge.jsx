import styled from "styled-components";

export default function Bridge() {

  return(
    <Wrapper src={'/bridge.svg'}/>
  )
}

const Wrapper = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 54px;
  object-fit: contain;
  z-index: 10;
`