import styled from "styled-components";
import { useState } from "react";

/**
 *
 * @param {object} props
 * @param {string} props.inputKey 			          identifiant de l'input
 * @param {number || string} props.defaultValue       valeur par défaut
 * @param {string} props.label
 * @param {string} props.type                         type de l'input (string/number)
 * @param {function} props.handleChange	              fonction à appeler lors d'un changement
 *
 * @returns {JSX.Element}
 */
export default function InputField({
  defaultValue,
  handleChange,
  type,
  label,
  inputKey
}) {

  const [focused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleBlur = (e) => {
    let value = type === "number" ? e.target.valueAsNumber : e.target.value;
    handleChange(inputKey, value);
    setIsFocused(false);
  }

  return (
    <Wrapper focused={focused}>
      <p className={"input-label"}>{label}</p>
      <Input
        size={2}
        type={type}
        name={label}
        placeholder={defaultValue}
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={(e) => handleBlur(e)}
        onFocus={() => setIsFocused(true)}
      />
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
  border: 1px solid ${p => p.focused ? "orangered" : "#333333"};
  margin-top: -1px;
  z-index: ${p => p.focused ? 2 : 1};
  
  transition: all 400ms;

  .input-label {
    color: rgba(244, 244, 244, 0.84);
    line-height: 48px;
    width: 80%;
    height: 100%;
    margin-left: 18px;
  }
  
  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  position: relative;
  padding: 0 18px;
  width: 33%;
  height: 100%;
  margin: 0;

  color: #f4f4f4;
  background-color: transparent;
  border-left: 1px solid #333333;
  
  caret-color: orangered;
`;

