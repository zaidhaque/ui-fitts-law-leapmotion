var cursors = {};

var controller = Leap.loop({enableGestures: true}, function(frame){

  frame.hands.forEach(function(hand, index) {
    var cursor = ( cursors[index] || (cursors[index] = new Cursor()) );    
    cursor.setTransform(hand.screenPosition(), hand.roll());
    console.log(hand)
  });

  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              console.log("Circle Gesture");
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
              console.log("Swipe Gesture");
              break;
        }
    });
  }
}).use('screenPosition', {scale: 0.3});

var Cursor = function() {
  var cursor = this;
  var img = document.createElement('img');
  img.src = 'http://www.iconsdb.com/icons/preview/orange/square-xxl.png';
  img.width = "10"
  img.height = "10"
  img.style.position = 'absolute';
  img.onload = function () {
    cursor.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }
  
  Cursor.setTransform = function(position, rotation) {

    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

    img.style.transform = 'rotate(' + -rotation + 'rad)';

    if (rotation < -1) {
	    // window.alert("cat is rotating!")
	    simulateClick(position[0]+10, position[1]+10)
    }
    
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

cursors[0] = new Cursor();

function simulateClick(x,y){
  var ev = document.createEvent("MouseEvent");
  var el = document.elementFromPoint(x,y);
  ev.initMouseEvent(
      "mousedown",
      true /* bubble */, false /* cancelable */,
      window, null,
      x, y, x, y, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
  );
  el.dispatchEvent(ev);
  ev.initMouseEvent(
      "mouseup",
      true /* bubble */, false /* cancelable */,
      window, null,
      x, y, x, y, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
  );
  el.dispatchEvent(ev);
}

// This allows us to move the cat even whilst in an iFrame.
Leap.loopController.setBackground(true)