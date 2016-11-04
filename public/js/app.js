(function() {
  'use strict';

  var SoundCloudSetter = function(audio) {
    var self = this;
    var client_id = SOUNDCLOUD_API_KEY;
    self.streamUrl = "";
    self.artwork_url = "";
    self.audio = audio;

    this.loadSoundCloud = function(track_url, successCallback, errorCallback) {
      SC.initialize({
        client_id: client_id
      });

      SC.resolve(track_url)
      .then(function(data){
        self.streamUrl = data.stream_url + '?client_id=' + client_id;
        self.artwork_url = data.artwork_url;
        successCallback();

      }).catch(function(error){

        errorCallback(error);
      });
    }

    this.directLoadSoundCloud = function(direction) {
      if (this.audio.paused) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }
  };

  var SoundCloudAudioSource = function(audio){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    var source = audioCtx.createMediaElementSource(audio);

    this.analyser = audioCtx.createAnalyser();
    var bufferLength = this.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    this.analyser.fftSize = 256;
    this.analyser.connect(audioCtx.destination);

    audio.crossOrigin = "anonymous";
    source.connect(this.analyser);

    this.playStream = function(streamUrl) {
      audio.setAttribute('src', streamUrl);
      audio.play();
    }

  }

  var ControlGroup = function() {

    var ctrGroup = document.querySelector('.ctrgroup');

    this.toggle = function() {

      if (ctrGroup.className.indexOf('ctrgroup--hidden') === 1) {
        ctrGroup.className = ctrGroup.className.split(' ')[0];
      } else {
        ctrGroup.className = ctrGroup.className + ' ctrgroup--hidden';
      }
    };

  };

  var Visualizer = function() {
    var fgCanvas;
    var fgCtx;
    var bgCanvas;
    var bgCtx;
    var albumImg;
    var canvas;
    var audioSource;
    var gradientColor = {0: ['#89fffd' , '#ef32d9'], 1:['#00dbde','#fc00ff'], 2: ['#7BC6CC' , '#BE93C5'], 3 : ['#E55D87' , '#5FC3E4']};

    var drawBg = function(){
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.beginPath();
      bgCtx.rect(0, 0, bgCanvas.width, bgCanvas.height);

      var r = Math.floor(Math.random() * (3 + 1));
      var gradient = bgCtx.createLinearGradient(0,0,1500,0);

      gradient.addColorStop(0, gradientColor[r][0]); //#00DBDE'rgb(0, 219, 222)'
      gradient.addColorStop(1, gradientColor[r][1]); //#fc00ff'rgb(252, 0, 255)'
      bgCtx.fillStyle = gradient;
      bgCtx.fill();
    }

    this.resizeCanvas = function() {
      if (fgCanvas) {
        // resize the foreground canvas
        fgCanvas.width = window.innerWidth;
        fgCanvas.height = window.innerHeight;

        // resize the bg canvas
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        drawBg();

      }
    };

    var draw = function() {
      var barHeight;
      var barData;
      var barWidth = (fgCanvas.width / audioSource.bufferLength) * 2.5;
      var x = 0;

      audioSource.analyser.getByteFrequencyData(audioSource.dataArray);

      fgCtx.clearRect(-fgCanvas.width, -fgCanvas.height, fgCanvas.width*2, fgCanvas.height *2);

      for (var i = 0; i < audioSource.bufferLength; i++) {
        barData = audioSource.dataArray[i];
        barHeight = barData * 3;

        fgCtx.fillStyle = 'rgba(' + (barData+200) + ', '+ (barData+200)+',' + (barData+200) + ', 0.4'+')';
        fgCtx.fillRect(x, fgCanvas.height-barHeight/2 + 100, barWidth, barHeight/100);

        fgCtx.fillRect(x, fgCanvas.height-barHeight/2, barWidth, barHeight/2);
        fgCtx.beginPath();
        fgCtx.arc(x, fgCanvas.height-barHeight/2 - 90, barWidth /3 , 0, 2 * Math.PI, false);

        fgCtx.fill();

        x += barWidth + 1;
      }

      requestAnimationFrame(draw);
    }

    this.drawAlbumImg = function() {
      albumImg.setAttribute('src', soundCloud.artwork_url);

    }

    this.init = function(option) {

      audioSource = option.audioSource;
      canvas = document.querySelector(option.canvas);

      fgCanvas = document.createElement('canvas');
      fgCanvas.setAttribute('style', 'position: absolute; z-index: 10');
      fgCtx = fgCanvas.getContext("2d");
      canvas.appendChild(fgCanvas);

      albumImg = document.createElement('img');
      albumImg.setAttribute('style', 'position: absolute; z-index: 20; top: 10px; right: 10px; opacity: 0.5');
      canvas.appendChild(albumImg);

      bgCanvas = document.createElement('canvas');
      bgCtx = bgCanvas.getContext("2d");
      canvas.appendChild(bgCanvas);

      this.resizeCanvas();
      draw();
      setInterval(drawBg, 1000 / 2);
      window.addEventListener('resize', this.resizeCanvas, false);
    }

  }

  var play = function(trackurl) {
    soundCloud.loadSoundCloud(trackurl,
      function() {
        audioSource.playStream(soundCloud.streamUrl);
        canvas.style.display = 'block';
        visualizer.drawAlbumImg();
        setTimeout(ctrGroup.toggle, 3000); // auto-hide the control panel
      },
      function(error) {
        console.log(error);
      });
  };

  var audio = document.querySelector('.ctrgroup__player__audio');
  var form = document.querySelector('.ctrgroup__player__form');
  var toggleButton = document.querySelector('.ctrgroup__togglebtn');
  var canvas = document.querySelector('.canvas');

  var soundCloud = new SoundCloudSetter(audio);
  var audioSource = new SoundCloudAudioSource(audio);
  var ctrGroup = new ControlGroup();
  var visualizer = new Visualizer();

  visualizer.init({
    canvas : '.canvas',
    audioSource : audioSource,
  });

  canvas.style.display = 'none';
  ctrGroup.toggle();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var trackUrl = document.querySelector('.ctrgroup__player__form__input').value;
    //TODO validation check
    play(trackUrl);
  });

  toggleButton.addEventListener('click', function(e) {
    e.preventDefault();
    ctrGroup.toggle();
  });

  audio.addEventListener("ended", function(){
    canvas.style.display = 'none';
  });

}());
