'use strict';

let simuOn = 0;
var audioCtx; 

function audioStart(){
    if (simuOn == 0){
        init(inst)
        ctxW = getCTX("wavForm");
        simuOn = 1;
        $('#audioStart').css('background-image','url(./css/images/on.png)');
        //startLoggingMIDIInput(window.inst)


        //drawingUpdate(true);
    } else if (simuOn == 1){
        simuOn = 2;
        audioCtx.suspend();
        $('#audioStart').css('background-image','url(./css/images/off.png)');
        //drawingUpdate(false);
    } else {
        simuOn = 1;
        audioCtx.resume();
        $('#audioStart').css('background-image','url(./css/images/on.png)');
        //drawingUpdate(true);
    }
}

function audioStop(){
   
        audioCtx.close();
        $('#audioStart').html('Play')
        //drawingUpdate(false);
        simuOn = 0;
  
}



let Nbuffer  = 2048*2;

async function createFilter(audioCtx) {
    let convolver = audioCtx.createConvolver();

    // load impulse response from file
    let response     = await fetch(inst.mics[0].filter);
    let arraybuffer  = await response.arrayBuffer();
    convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);

    return convolver;
}

async function init(inst) {
      
      // Web Audio API
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
      audioCtx = new window.AudioContext();
           
      // Il faut mettre ici le filtre
      let filter = await createFilter(audioCtx);

      let fs = audioCtx.sampleRate;
      let dt = 1 / fs;

      
      var p;
      
      inst.init(Nbuffer, dt)
   
      let scriptNode = audioCtx.createScriptProcessor(Nbuffer, 1, 1); //(bufferSize, numberOfInputChannels, numberOfOutputChannels);
      
      
      if ( $('#isFilterOn').is(":checked") ){
        scriptNode.connect(filter);
        
        filter.connect(audioCtx.destination);
      } else {
        scriptNode.connect(audioCtx.destination);  
      }
      
      let t = 0;
      // audioProcessingEvent ----------------------------------------------------------------------------------------
      scriptNode.onaudioprocess = function(audioProcessingEvent) {
            let t1 = Date.now();
            

            let outputBuffer = audioProcessingEvent.outputBuffer;
            // si 2 voies imbriquer la boucle ci-dessous dans une autre
            // for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
            //   let outputData = outputBuffer.getChannelData(channel);
            // }


            let outputData = outputBuffer.getChannelData(0);
            
            inst.computeNext()
            
            t += Nbuffer * dt;
  
            inst.output(outputData)
            
            drawWavForm(Nbuffer, [...outputData]);            
            
            let deltaT = Date.now() - t1;
            $("#speed").html("CPU usage : "+(deltaT/(10*Nbuffer*dt)).toFixed(2)+'%');
            //console.log("CPU usage : "+(deltaT/(10*Nbuffer*dt)).toFixed(2)+'%');
            
        }

} 


export { audioStart, audioStop }

