function getCTX(Id){
  var obj = document.getElementById(Id);
  var ctx = obj.getContext("2d");
  obj.width = ctx.width = $("#"+Id).width(); //;
  obj.height = ctx.height = $("#"+Id).height(); //obj.height;
  //console.log($("#"+Id).width(), obj.width, obj.height)
  return(ctx);
}

ctxW = getCTX("wavForm");


ctxW.xmin = 0;
ctxW.xmax = 1;
ctxW.ymin = -1;
ctxW.ymax = 1;

function drawArray(ctx, x, y){
  ctx.clearRect(0, 0, ctx.width, ctx.height); // canvas

 
  //ctx.setLineDash([1, 0]);
  ctx.beginPath();
  ctx.arc((-ctx.xmin+x[x.length-1])/(ctx.xmax-ctx.xmin)*ctx.width, ctx.height-(-ctx.ymin+y[x.length-1])/(ctx.ymax-ctx.ymin)*ctx.height, 2, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();


  ctx.lineWidth = 2;
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo((-ctx.xmin+x[0])/(ctx.xmax-ctx.xmin)*ctx.width, ctx.height-(-ctx.ymin+y[0])/(ctx.ymax-ctx.ymin)*ctx.height);
  for (let i = 1; i < x.length; i++) { 
      ctx.lineTo((-ctx.xmin+x[i])/(ctx.xmax-ctx.xmin)*ctx.width, ctx.height-(-ctx.ymin+y[i])/(ctx.ymax-ctx.ymin)*ctx.height);
  }
  ctx.stroke()
}
 
function drawWavForm(Nbuffer, viewData) {


  let trigger = 0

  let firstPos = 0;

  for (let i = 0; i < viewData.length; i++){

      // find the first point in the waveform buffer
      // where the waveform crosses zero, going in a positive direction
      if ((viewData[i] > 0.01) && (viewData[i-1] <= 0.01) && (trigger == 0))
      {
          trigger = 1;
          firstPos = i;
      }

  }

  for (let i = 0; i < firstPos; i++) {
          viewData.push(viewData.shift());
  }
  
  let x = new Array(viewData.length/2);        
  
  for (let i = 0; i < viewData.length/2; i++){
          x[i] = 2*i/Nbuffer;
  }

  drawArray(ctxW, x, viewData);

  /*ctxW.lineWidth = 2;
  ctxW.strokeStyle = 'red';
  ctxW.setLineDash([5]);
  ctxW.beginPath();
  ctxW.moveTo(0, wavForm.height / 2 - p_m*0.0000001*(wavForm.height / 2));
  ctxW.lineTo(wavForm.width, wavForm.height / 2 - p_m*0.0000001*(wavForm.height / 2));
  ctxW.stroke()*/

  
}


let queueLength = 5

var queueP = new Array(queueLength).fill(0);
var queueQl = new Array(queueLength).fill(0);
var queueRMS = new Array(queueLength).fill(0);
var queueFjeux = new Array(queueLength).fill(0);


function drawingUpdate(state){

if(!state){
   clearInterval(intervalId);
} else {

  intervalId  = window.setInterval(function(){
  
      for (var i = 0; i < queueLength-1; i++) {
          queueP[i] = queueP[i+1];
          queueQl[i] = queueQl[i+1];
          queueRMS[i] = queueRMS[i+1];
          queueFjeux[i] = queueFjeux[i+1];

      }
      
     queueP[queueP.length-1] = inst.vars[0]; //answer.data[0];
     queueQl[queueP.length-1] = inst.vars[1]; //answer.data[1];
     queueRMS[queueP.length-1] = inst.rms; //answer.data[3];
     queueFjeux[queueP.length-1] = inst.freq; //answer.data[4];
      
     drawArray(ctxPressure, queueP, queueRMS);
     drawArray(ctxFreq, queueP, queueFjeux);


   /*      Plotly.restyle(graphDivPressure, {'x' : [queueP], 'y':[queueRMS]}, layoutPressure, [0]);
    Plotly.restyle(graphDivQl, {'x' : [queueQl], 'y':[queueRMS]}, layoutQl, [0]);
      Plotly.restyle(graphDivPressureF, {'x' : [queueP], 'y':[queueFjeux]}, layoutPressure, [0]);
      Plotly.restyle(graphDivQlF, {'x' : [queueQl], 'y':[queueFjeux]}, layoutQl, [0]);*/

 }, 100);

}
}



/*let ctxPressure = getCTX("gd1");
let ctxFreq = getCTX("gd3");*/

function initDrawing(){
  b = inst.padUpdate(1, 1)
  a = inst.padUpdate(0, 0)
  ctxPressure.xmin = a[0]
  ctxPressure.xmax = b[0]
  ctxPressure.ymin = a[0]
  ctxPressure.ymax = b[0]


  ctxFreq.xmin = a[0]
  ctxFreq.xmax = b[0]
  ctxFreq.ymin = 0
  ctxFreq.ymax = 600
}

/*var divQl = document.getElementById('gdQl');
var divPressureF = document.getElementById('gdPressureF');
var divQlF = document.getElementById('gdQlF');*/

