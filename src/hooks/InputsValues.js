import { useState } from "react"

export const useInputValues = (values) => {

  const [inputValues, setInputValues] = useState(values);

  const handleInputValuesChange = (key, value) => {
    setInputValues(
      {
        ...inputValues,
        [key]: value
      }
    )
  }

  const handleInputValuesChanges = (set) => {
    setInputValues(
      {...inputValues, ...set}
    )
  }

  return [
    inputValues,
    handleInputValuesChange,
    handleInputValuesChanges
  ]
}