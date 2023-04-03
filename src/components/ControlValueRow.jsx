import styled from "styled-components";
import { arrayToStr } from "../utils/arrays";



export default function ControlValueRow({label, value, type}) {

  if(type === 'array') {
    value = arrayToStr(value);
  }
  return(
    <Wrapper>
      <p className={"control-label"}>{label}</p>
      <Field>{value}</Field>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #333333;
  margin-top: -1px;

  .control-label {
    color: rgba(244, 244, 244, 0.84);
    line-height: 48px;
    width: 80%;
    height: 100%;
    margin-left: 18px;
  }
`;

const Field = styled.p`
  position: relative;
  line-height: 48px;
  padding: 0 18px;
  width: 33%;
  height: 100%;
  margin: 0;

  color: #f4f4f4;
  background-color: transparent;
  border-left: 1px solid #333333;

  caret-color: #25C8FC;
`;