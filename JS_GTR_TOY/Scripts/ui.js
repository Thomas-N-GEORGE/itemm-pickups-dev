


let isPlaying = false;

var fretPos = [2.54, 9.297, 16.05, 22.377, 28.441, 34.262, 39.741, 44.981, 49.90, 54.664, 59.003, 63.317, 67.243, 71.058, 74.668, 78.081, 81.375, 84.342, 87.183, 90.014, 92.555, 95.033, 97.367];



$("#fretboard").click(setFinger);
$("#fretboard").dblclick(removeFinger);

var struming = false;
var strumPosX=0, strumPosY=-0.5, timeStamp;
$("#struming").mousemove(strum);
$("#struming").mousedown(function(e){struming=true; var rect = e.target.getBoundingClientRect(); strumPosY=(6*(e.clientY-rect.top)/$("#struming").height()-1/2);});
$("#struming").mouseup(function(){struming=false});

function idStringPos(e){
//e.stopPropagation();
    
  strNumber = Math.floor(6*e.clientY/e.target.offsetHeight)
    
  fretNumber = fretPos.findIndex(element => element > 100*(e.clientX-$("#fretboard").offset().left)/e.target.offsetWidth);

  if (screen.orientation.type == "portrait-primary") {
  } else if (screen.orientation.type == "landscape-primary"){
    
  }
  
  return [strNumber, fretNumber]
  
}
  
function setFinger(e){
  if (e.detail === 1) {
    
    posId = idStringPos(e);
    $('#finger'+(posId[0]+1)).css('left', (0.666*fretPos[posId[1]-1]+0.333*fretPos[posId[1]])*$("#fretboard").width()*0.01);
    inst.changeChord([posId[0]], posId[1]);
  }
}

function removeFinger(e){

    posId = idStringPos(e);
    $('#finger'+(posId[0]+1)).css('left', -100);
    inst.changeChord([posId[0]], 0);

}

function toggleString(s){
  
  if (inst.strings[s].muted){
    inst.strings[s].muted = false;
    
    $($(".stringName")[s]).css('color', 'lime');
    
    
  } else {
    inst.strings[s].muted = true;
    
    $($(".stringName")[s]).css('color', 'red');
    
  }
  
  
  
}

function strum(e){
  
  e.stopPropagation();
  
  if (e.target.id =="struming") {
    
    var x, y;
    var rect = e.target.getBoundingClientRect()
    
    y = (6*(e.clientY-rect.top)/$("#struming").height()-1/2);
    
    speed = (y - strumPosY)/(e.timeStamp-timeStamp)
    strumPosX = 1-(e.pageX-rect.left)/$("#struming").width();
    
    if (Math.floor(y) != Math.floor(strumPosY)  ) {
      if (y > strumPosY && (y < 6 )) {
        text = ""
        for (var i = Math.floor(strumPosY)+1; i <= Math.floor(y); i++) {
          text = text + i+","
          inst.pluck(i, strumPosX, speed);
        }
      } else if (strumPosY < 6){
        
        text = ""
        for (var i = Math.floor(strumPosY); i >= Math.floor(y)+1; i--) {
          text = text + i+","
          inst.pluck(i, strumPosX, speed);
        }
      }
    }
    
    // Test si on a traversé une corde depuis le précédent
    
    // Calcul la vitesse en y
    
    // calcule la position en x
    
    
    strumPosY = y;
    timeStamp = e.timeStamp;
  } 
}

function test(e){
    if (struming ) {
        console.log(e.target.id)
    }
}

function playString(e){
//  e.stopPropagation();
    
  strNumber = Math.round(6*e.clientY/e.target.offsetHeight)
  
  fretNumber = fretPos.findIndex(element => element > (e.clientX-$("#fretboard").offset().left)/e.target.offsetWidth);
  console.log(fretNumber);
  
  // rapport longueur du manche / longueur de la corde
  let beta = 0.73;
  let relPosManche = (e.clientX-$("#fretboard").offset().left)/e.target.offsetWidth;
  let relPosCorde = beta*(1-relPosManche) + (1-beta);
  
  fretNumber = Math.floor(12*Math.log2(relPosCorde))

  
  //window.inst.pluck((1-0.75*e.clientX/e.target.offsetWidth));
  
  window.inst.pluck(2**(fretNumber/12))

  if (screen.orientation.type == "portrait-primary") {
  } else if (screen.orientation.type == "landscape-primary"){
    
  }
  
  
  
  /*if (~isPlaying){
    console.log('test')
    window.audioStart();
    isPlaying = true;
  }*/
  
  
  
  //console.log(fretNumber, strNumber)
  
}

var currentMenu = 0;
function chgMenu(direction){

    $($("#knobs .knobs-grid")[currentMenu]).fadeOut(30)

    currentMenu = (currentMenu + direction) % $("#knobs .knobs-grid").length;

    if (currentMenu < 0) {
      currentMenu += $("#knobs .knobs-grid").length;
    }

    $($("#knobs .knobs-grid")[currentMenu]).fadeIn(30)

    console.log(currentMenu);
}

$(".pickup").draggable({axis:"x",
    containment: "parent",
    cursor:"move",
    handle:".pickupHandle",
    stop:function(e, ui){
      
      var rect = e.target.parentNode.getBoundingClientRect()
    
      pos = 1-(e.clientX-rect.left)/$("#struming").width();
  
      inst.mics[0].updatePos(pos)
    }
  
});

