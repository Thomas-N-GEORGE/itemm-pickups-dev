import Spectrogram from 'spectrogram';
import styled from "styled-components";
import { useEffect } from "react";
import chroma from 'chroma-js';

export default function SpectroView({audioUrl}) {


  useEffect(() => {
  })


  function playSound() {

    let spectro = Spectrogram(document.getElementById('canvas'), {
      audio: {
        enable: true
      },
      colors: function(steps) {
        // let baseColors2 = [[0,0,255,1], [0,255,255,1], [0,255,0,1], [255,255,0,1], [ 255,0,0,1]];
        // let baseColors3 = [[14,14,14,1], [48,31,39,1], [132,70,57,1], [211,104,80,1], [ 252,76,37,1]];
        let baseColors = [[14,14,14,1], [48,31,39,1], [132,70,57,1], [ 252,76,37,0.92], [ 252,76,37,1]];
        let positions = [0, 0.15, 0.30, 0.50, 0.75];

        let scale = new chroma.scale(baseColors, positions)
          .domain([0, steps]);

        let colors = [];

        for (var i = 0; i < steps; ++i) {
          let color = scale(i);
          colors.push(color.hex());
        }

        return colors;
      }
    });

    let audioContext = new AudioContext();
    let request = new XMLHttpRequest();
    request.open('GET', audioUrl, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        spectro.connectSource(buffer, audioContext);
        spectro.start();
      });
    };

    request.send();
  }


  return(
    <Wrapper>
      <canvas id={"canvas"} width={600} height={400}></canvas>
      <button onClick={() => playSound()}>Play sound</button>
    </Wrapper>
  )

}

const Wrapper = styled.div`
  position: absolute;
  left: 400px;
  width: 600px;
  height: 400px;
`