(function() {
  'use strict';

  var SoundcloudStream = function(audio, uiController) {
    var self = this;
    var client_id = SOUNDCLOUD_API_KEY;
    this.sound = {};
    this.streamUrl = "";
    this.artwork_url = "";
    this.audio = audio;
    this.uiController = uiController;

    this.loadStream = function(track_url, successCallback, errorCallback) {
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


    this.directStream = function(direction){
      if(direction=='toggle'){
        if (this.audio.paused) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }
      else if(this.sound.kind=="playlist"){
        if(direction=='coasting') {
          this.streamPlaylistIndex++;
        }else if(direction=='forward') {
          if(this.streamPlaylistIndex>=this.sound.track_count-1) this.streamPlaylistIndex = 0;
          else this.streamPlaylistIndex++;
        }else{
          if(this.streamPlaylistIndex<=0) this.streamPlaylistIndex = this.sound.track_count-1;
          else this.streamPlaylistIndex--;
        }
        if(this.streamPlaylistIndex>=0 && this.streamPlaylistIndex<=this.sound.track_count-1) {
          this.audio.setAttribute('src',this.streamUrl());
          this.uiController.update(this);
          this.audio.play();
        }
      }
    }
  };

  var SoundCloudAudioSource = function(audio){
    var self = this;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    var source = audioCtx.createMediaElementSource(audio);

    self.analyser = audioCtx.createAnalyser();
    self.analyser.fftSize = 256;
    audio.crossOrigin = "anonymous";
    source.connect(self.analyser);
    self.analyser.connect(audioCtx.destination);

    this.bufferLength = self.analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(this.bufferLength);

    this.playStream = function(streamUrl) {
      audio.addEventListener("ended", function(){
        stream.directStream('coasting');
        // audio.currentTime = 0;
        // document.getElementById('viewport').style.display= 'none';
        // document.getElementById('controlPanel').style.display = 'block';
        // document.getElementById('LP-percent').style.display = 'block';
        // clearInterval(visualizer.drawBg);

        // document.getElementById('controlPanel').style.display = 'block';
      });
      audio.setAttribute('src', streamUrl);
      audio.play();
    }

  }

  var UIController = function() {
    var controlPanel = document.getElementById('controlPanel');
    var trackInfoPanel = document.getElementById('trackInfoPanel');

    this.clearInfoPanel = function() {
      // first clear the current contents
      trackInfoPanel.className = 'hidden';
    };
    this.update = function(loader) {

      // display the track info panel
      trackInfoPanel.className = '';

      // add a hash to the URL so it can be shared or saved
      // var trackToken = stream.sound.permalink_url.substr(22);
      // window.location = '#' + trackToken;
    };
    this.toggleControlPanel = function() {
      if (controlPanel.className.indexOf('hidden') === 0) {
        controlPanel.className = '';
      } else {
        controlPanel.className = 'hidden';
      }
    };
  };
  var Visualizer = function() {
    var fgCanvas;
    var fgCtx;
    var bgCanvas;
    var bgCtx;
    var albumImg;
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
        // fgCtx.translate(fgCanvas.width/2,fgCanvas.height/2);

        // resize the bg canvas
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        // tileSize = fgCanvas.width > fgCanvas.height ? fgCanvas.width / 25 : fgCanvas.height / 25;

        drawBg();

      }
    };

    var draw = function() {
      audiosource.analyser.getByteFrequencyData(audiosource.dataArray);

      fgCtx.clearRect(-fgCanvas.width, -fgCanvas.height, fgCanvas.width*2, fgCanvas.height *2);

      // fgCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (fgCanvas.width / audiosource.bufferLength) * 2.5;
      var barHeight;
      var barData;
      var x = 0;

      for(var i = 0; i < audiosource.bufferLength; i++) {
        barData = audiosource.dataArray[i];
        // mesh.rotation.x += barData;
        // mesh.rotation.y += barData + 1;
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

    this.init = function(audiosource) {
      audiosource = audiosource;
      var canvas = document.getElementById('viewport');
      fgCanvas = document.createElement('canvas');
      fgCanvas.setAttribute('style', 'position: absolute; z-index: 10');
      fgCtx = fgCanvas.getContext("2d");
      canvas.appendChild(fgCanvas);

      albumImg = document.createElement('img');
      albumImg.setAttribute('src', stream.artwork_url);
      albumImg.setAttribute('style', 'position: absolute; z-index: 20; top: 10px; right: 10px; opacity: 0.5');
      canvas.appendChild(albumImg);

      bgCanvas = document.createElement('canvas');
      bgCtx = bgCanvas.getContext("2d");
      canvas.appendChild(bgCanvas);

      this.resizeCanvas();
      draw();
      setInterval(drawBg, 1000 / 5);
      window.addEventListener('resize', this.resizeCanvas, false);
    }

  }

  var fade = function(element) {
    var op = 1;
    var timer = setInterval(function () {
      if (op <= 0.1){
        clearInterval(timer);
        element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
    }, 1000);
  }

  var play = function(trackurl) {
    stream.loadStream(trackurl,
      function() {
        // fade(document.getElementById('controlPanel'));
        // fade(document.getElementById('LP-percent'));
        // document.getElementById('viewport').style.display= 'block';
        // document.getElementById('controlPanel').style.display = 'none';
        // document.getElementById('LP-percent').style.display = 'none';
        uiController.clearInfoPanel();
        audiosource.playStream(stream.streamUrl);
        uiController.update(stream);
        setTimeout(uiController.toggleControlPanel, 3000); // auto-hide the control panel
        visualizer.init(audiosource);
        // audiosource.draw();
      },
      function(error) {
        console.log(error);
      });
    };

    var visualizer = new Visualizer(),
        audio = document.getElementById('audio'),
        uiController = new UIController(),
        stream = new SoundcloudStream(audio, uiController),
        form = document.getElementById('form'),
        toggleButton = document.getElementById('toggleButton'),
        audiosource = new SoundCloudAudioSource(audio);

    uiController.toggleControlPanel();

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var trackUrl = document.getElementById('input').value;
      play(trackUrl);
    });

    toggleButton.addEventListener('click', function(e) {
      e.preventDefault();
      uiController.toggleControlPanel();
    });

    // play("https://soundcloud.com/cosmosmidnight/cosmos-midnight-walk-with-me-feat-kucka");

  }());
