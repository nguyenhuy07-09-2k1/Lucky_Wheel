$(document).ready(() => {
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
      'text': 'Nguyễn Khánh',
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
    'textFontSize': 24,
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

  let canvas = $('#canvas');
  let tx = canvas[0].getContext('2d');

  const myModal = new bootstrap.Modal(document.getElementById('MyModal'), {})
  // or
  var indicator = new TimelineMax();
  var active = $("#prizePointer")

  indicator.to(active, 0.3, { rotation: -50, transformOrigin: "65% 36%", ease: Power1.easeOut })
    .to(active, 0.3, { rotation: 3, ease: Power4.easeOut })
    .add("end");

    function startSpin() {
      indicator.timeScale(1).seek(0);
  
      audio_applause.pause();
      audio_applause.currentTime = 0;
      audio_bg.play();
  
      theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
      theWheel.rotationAngle = theWheel.rotationAngle % 360;
      theWheel.draw();
  
      theWheel.animation.spins = Math.floor(Math.random() * (30 - 15)) + 15
      duration = Math.floor(Math.random() * (35 - 30)) + 30;
  
      theWheel.animation.duration = duration;
  
      theWheel.startAnimation();
  
      $(canvas).off('click')
    }
  

  $(canvas).on('click', () => {
    startSpin()
  })


  let audio_applause = new Audio('./Tieng-vo-tay-huyt-sao-www_nhacchuongvui_com.mp3'); 
  audio_applause.loop = true;
  // This function called after the spin animation has stopped.
  function alertPrize() {
    // Get the audio with the sound it in, then play.
    audio_bg.pause();
    audio_applause.play();
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
    $(".modal-body").first().html(`<h3>${winningSegment.text}</h3>`)
    myModal.show()

    $(canvas).on('click', () => {
      startSpin()
    })

    // alert("You have won " + winningSegment.text + "!");


  }

  let audio = new Audio('./tick.mp3');  // Create audio object and load desired file.

  let duration = 0;

  function playSound() {
    // Stop and rewind the sound (stops it if already playing).
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();

    if (indicator.progress() > .2 || indicator.progress() === 0) {
      indicator.play(0);
    }
    console.log(duration)
  }


  let audio_bg = new Audio('./491912215546548993.mp3');  // Create audio object and load desired file.

  audio_bg.loop = true;
  // Called when the animation has finished.
  function stopSound() {
    // Stop and rewind the sound (stops it if still playing).

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