import styled from "styled-components";

export default function NeckString({settings}) {

  const {
    size,
    stripes
  } = settings;

  return (
    <Wrapper
      stripes={stripes}
      size={size}>
      <div className={"neck-string-line"}></div>
    </Wrapper>
  )

}

const Wrapper = styled.div`
  
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 16.66%;
  width: 100%;
  
  .neck-string-line {
    width: 100%;
    height: ${({size}) => size}px;
    background-color: #777777;
    background-image: ${p => p.stripes ? "url('/stripes.svg')" : "none"};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  
`;