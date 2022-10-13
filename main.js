$(document).ready(() =>{
  let theWheel = new Winwheel({
    'canvasId': 'canvas',
    'outerRadius': 300,
    'innerRadius': 40,
    'numSegments': 4,
    'pointerAngle': 38,
    'pins':    // Specify pin parameters.
    {
      'number': 18,
      'outerRadius': 5,
      'margin': 10,
      'fillStyle': '#7734c3',
      'strokeStyle': '#ffffff'
    },
    // 'pointerGuide':        // Turn pointer guide on.
    // {
    //   'display': true,
    //   'strokeStyle': 'red',
    //   'lineWidth': 3
    // },
    'segments': [{
      'fillStyle': '#facc15',
      'text': 'Nguyễn Khánh'
    },
    {
      'fillStyle': '#4ade80',
      'text': 'Nguyễn Minh Đăng'
    },
    {
      'fillStyle': '#38bdf8',
      'text': 'Nguyễn Hoàng Thảo'
    },
    {
      'fillStyle': '#fb7185',
      'text': 'Nguyễn Quốc Huy'
    }
    ],
    'fillStyle': '#e7706f',
    'strokeStyle': '#ffffff',
    'lineWidth': 4,
    'textMargin': 30,
    'textAlignment': 'inner',
    'textOrientation': 'horizontal', // Set orientation. horizontal, vertical, curved.
    'textFontFamily': 'Roboto', // Monospace font best for vertical and curved.
    'textFontSize': 15,
    'animation': // Note animation properties passed in constructor parameters.
    {
      'type': 'spinToStop', // Type of animation.
      'duration': 5, // How long the animation is to take in seconds.
      'spins': 8, // The number of complete 360 degree rotations the wheel is to do.
      'callbackFinished': alertPrize,
      'soundTrigger': 'pin',
  
      // During the animation need to call the drawTriangle() to re-draw the pointer each frame.
      'callbackAfter': '',
      'callbackSound': playSound,
    }
  });
  
  let canvas = document.getElementById('canvas');
  let tx = canvas.getContext('2d');
  
  
  canvas.addEventListener('click', () => {
    startSpin()
  })
  // This function called after the spin animation has stopped.
  function alertPrize() {
    // Get the audio with the sound it in, then play.
    let winsound = document.getElementById('winsound');
    winsound.play();
    audio_bg.pause();
    // audio_bg.currentTime = 0;
    // Call getIndicatedSegment() function to return pointer to the segment pointed to on wheel.
    let winningSegment = theWheel.getIndicatedSegment();
    // Get the number of the winning segment.
    let winningSegmentNumber = theWheel.getIndicatedSegmentNumber();
  
    // Loop and set fillStyle of all segments to gray.
    // for (let x = 1; x < theWheel.segments.length; x++) {
    //   theWheel.segments[x].fillStyle = 'gray';
    // }
  
  
  
    // Make the winning one yellow.
    theWheel.segments[winningSegmentNumber].fillStyle = '#7e22ce';
    theWheel.deleteSegment(winningSegmentNumber);

  
    theWheel.draw();
    // Basic alert of the segment text which is the prize name.
    alert("You have won " + winningSegment.text + "!");
  
  
  
  }
  
  let audio = new Audio('./tick.mp3');  // Create audio object and load desired file.
  
  let time_click, time_click2, timestamp_will_break = null, half_pass_time, duration = 0;
  var pointer = document.getElementById("prizePointer");
  let is_break = false;
  function playSound() {
    // Stop and rewind the sound (stops it if already playing).
    audio.pause();
    audio.currentTime = 0;
  
    // Play the sound.
    audio.play();
    if (timestamp_will_break >= new Date().getTime() && !is_break) {
      console.log("123")
      new Promise((resolve) => {
        setTimeout(
  
          () => {
            if (!pointer.classList.contains("rotate")) {
              pointer.classList.add("rotate")
            }
          }, 50);
      })
  
      new Promise((resolve) => {
        setTimeout(
  
          () => {
            if (pointer.classList.contains("rotate")) {
              pointer.classList.remove("rotate")
            }
          }, 150);
      })
      
      
  
    }
  
    if (half_pass_time <= new Date().getTime() ) {
      is_break =true;
      pointer.style.transition = "all 0.5s"
      console.log("huhu")
      new Promise((resolve) => {
        setTimeout(
  
          () => {
            if (!pointer.classList.contains("rotate")) {
              pointer.classList.add("rotate")
            }
          }, 100);
      })
  
      new Promise((resolve) => {
        setTimeout(
  
          () => {
            if (pointer.classList.contains("rotate")) {
              pointer.classList.remove("rotate")
            }
          }, 500);
      })
    }
  
    console.log(duration)
  }
  
  
  let audio_bg = new Audio('./491912215546548993.mp3');  // Create audio object and load desired file.
  
  
  // Called when the animation has finished.
  function stopSound() {
    // Stop and rewind the sound (stops it if still playing).
  
  }
  
  
  function startSpin() {
    time_click = new Date()
    time_click2 = new Date()
  is_break = false;
  
    audio_bg.play();
  
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = theWheel.rotationAngle % 360;
    theWheel.draw();
  
    theWheel.animation.spins = Math.floor(Math.random() * (30 - 15)) + 15
    duration = Math.floor(Math.random() * (15 - 10)) + 10;
    timestamp_will_break = time_click.setSeconds(time_click.getSeconds() + duration)
    half_pass_time = time_click2.setSeconds(time_click2.getSeconds() + Math.round(duration / 4))
    theWheel.animation.duration = duration;
    console.log(half_pass_time - timestamp_will_break)
  
    theWheel.startAnimation();
  }
  
  
  
  function addSegment() {
    // Use a date object to set the text of each added segment to the current minutes:seconds
    // (just to give each new segment a different label).
    let date = new Date();
  
    // The Second parameter in the call to addSegment specifies the position,
    // in this case 1 meaning the new segment goes at the start of the wheel.
    theWheel.addSegment({
      'text': date.getMinutes() + ':' + date.getSeconds(),
      'fillStyle': 'aqua'
    }, 1);
  
    // The draw method of the wheel object must be called in order for the changes
    // to be rendered.
    theWheel.draw();
  }
  
  function deleteSegment() {
    // Call function to remove a segment from the wheel, by default the last one will be
    // removed; you can pass in the number of the segment to delete if desired.
    theWheel.deleteSegment(3);
  
    // The draw method of the wheel object must be called to render the changes.
    theWheel.draw();
  }
  
 
})