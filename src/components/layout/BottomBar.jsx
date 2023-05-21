import styled from "styled-components";


export default function BottomBar() {

return (
    <Wrapper>
      <ButtonInfo>
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2ZM0 14C0 6.26802 6.26802 0 14 0C21.732 0 28 6.26802 28 14C28 21.732 21.732 28 14 28C6.26802 28 0 21.732 0 14ZM14 8C14.5523 8 15 8.44772 15 9V9.01C15 9.56229 14.5523 10.01 14 10.01C13.4477 10.01 13 9.56229 13 9.01V9C13 8.44772 13.4477 8 14 8ZM14 12C14.5523 12 15 12.4477 15 13V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V13C13 12.4477 13.4477 12 14 12Z" fill="#F4F4F4"/>
        </svg>
        <p>Infos</p>
      </ButtonInfo>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: transparent;
  z-index: 100;
  box-sizing: border-box;
`;

const ButtonInfo = styled.button`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #1991e0;
  border-radius: 42px;
  border: none;
  cursor: pointer;

  svg {
    margin-left: 4px;
    margin-right: 6px;
  }

  p {
    margin: 0 10px 0 0;
    font-size: 16px;
  }

`;