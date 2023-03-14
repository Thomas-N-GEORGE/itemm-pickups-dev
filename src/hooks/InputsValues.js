import { useState } from "react"

export const useInputValues = (values) => {

  const [inputValues, setInputValues] = useState(values);

  const handleInputValuesChange = (key, value) => {
    setInputValues((
      {
        ...inputValues,
        [key]: value
      }
    ))
  }

  return [
    inputValues,
    handleInputValuesChange,
  ]
}