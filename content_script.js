
var Timing = {
  StartTime: null,
  EndTime: null
}

var statusType = {
  IDLE: 0,
  RUNNING: 1
}

var currentStatus = statusType.IDLE;

function dOMSubtreeModified() {

  if (currentStatus == statusType.IDLE)
  { 
    Timing.StartTime = new Date(); 
    console.log("StartTime : "+Timing.StartTime);
    currentStatus = statusType.RUNNING
  }
  else
  {
    Timing.EndTime = new Date();
  }
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action == 'start_recording') {
      console.log('Attaching Event Listener..');
      document.body.addEventListener('DOMSubtreeModified', dOMSubtreeModified, false);
    }
    else if (currentStatus == statusType.RUNNING)
    {
      document.body.removeEventListener('DOMSubtreeModified', dOMSubtreeModified, false);
      console.log('Removing Event Listener..');
      logDifferece(Timing.StartTime,Timing.EndTime);
      currentStatus = statusType.IDLE;
    }
  });

function logDifferece(date1, date2) {

  var diff = (date2 - date1) / 1000;
  var milisec = (date2 - date1) % 1000
  var diff = Math.abs(Math.floor(diff));

  var days = Math.floor(diff / (24 * 60 * 60));
  var leftSec = diff - days * 24 * 60 * 60;

  var hrs = Math.floor(leftSec / (60 * 60));
  var leftSec = leftSec - hrs * 60 * 60;

  var min = Math.floor(leftSec / (60));
  var leftSec = leftSec - min * 60;


  console.log(hrs + " hours " + min + " minutes and " + leftSec + " seconds with "+milisec+" millisecond.");

}