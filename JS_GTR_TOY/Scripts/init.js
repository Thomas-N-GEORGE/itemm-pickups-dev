'use strict';

import { instrument, corde } from "./guitare.js";

import { audioStart, audioStop } from "./audio.js";

let guitare = new instrument("Guitare", "light", 10000, 1e4);

//import { updatePad } from "./pad.js";

window.audioStart = audioStart;
window.audioStop = audioStop;


//window.updatePad = updatePad;

/*const queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let inst = urlParams.get("inst")

console.log(inst)

switch (inst) {
    case "violon" : 
        window.inst = violon;
        break;
    case "trombone" :
        window.inst = trombone;
        break;
    default :
        window.inst = trombone;
        break;
        
}*/

window.inst=guitare;


console.log(window.inst)

window.addEventListener('load', function () {
            $("#waiting").hide()
          })

