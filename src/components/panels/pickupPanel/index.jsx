import styled from "styled-components";
import PickupSlider from "../../Slider";
import { stringSettings } from "../../../settings";
import String from "./String";
import Bridge from "./Bridge";
import Pickup from "./Pickup";

export default function PickupPanel({isActive}) {


  // console.log("Rendering: PickupPanel");

  return (
    <Wrapper
      style={{left: `${isActive ? 0 : 1200}px`}}>

      <Pickup/>

      { stringSettings.map((str, key) =>
        <String key={key} settings={str}/>
      )}

      <Bridge/>

      <div className={"panel-bottom"}>
        <PickupSlider/>
      </div>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 880px;
  height: 200px;
  transition: left 600ms ease;
`;