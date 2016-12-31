/*! sona.js © sonasoeun.me, 2016 */
var sona = (function() {
  'use strict';

  var fgCanvas,
      fgCtx,
      bgCanvas,
      bgCtx,
      albumImg,
      analyser,
      canvas,
      bgIntervalId,
      gradientColor = {
        0: ['#00c9de', '#fc19ff'],
        1: ['#00DBDE', '#FC00FF']
      };

  function drawBg(){

    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.beginPath();
    bgCtx.rect(0, 0, bgCanvas.width, bgCanvas.height);

    var r = Math.floor(Math.random() * (2)),
        gradient = bgCtx.createLinearGradient(0,0,1500,0);

    gradient.addColorStop(0, gradientColor[r][0]); // #00DBDE'rgb(0, 219, 222)'
    gradient.addColorStop(1, gradientColor[r][1]); // #fc00ff'rgb(252, 0, 255)'

    bgCtx.fillStyle = gradient;
    bgCtx.fill();
  }

  function resizeCanvas() {

    if (fgCanvas) {

        fgCanvas.width = window.innerWidth,
        fgCanvas.height = window.innerHeight;
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        drawBg();
    }
  }

  function draw() {

    var barHeight,
        barData,
        x = 0;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var barWidth = (fgCanvas.width / bufferLength) * 2.5;
    analyser.getByteFrequencyData(dataArray);

    fgCtx.clearRect(-fgCanvas.width, -fgCanvas.height, fgCanvas.width*2, fgCanvas.height *2);

    for (var i = 0, l = bufferLength; i < l; i++) {
      barData = dataArray[i];
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

  function drawAlbumImg(artworkUrl) {
    albumImg.setAttribute('src', artworkUrl);
  }
  function clearBackEffect() {
    clearInterval(bgIntervalId);
  }

  function init(option){

    analyser = option.analyser;
    canvas = option.canvas;

    fgCanvas = document.createElement('canvas');
    fgCanvas.className = 'fgCanvas';
    fgCtx = fgCanvas.getContext("2d");
    canvas.appendChild(fgCanvas);

    albumImg = document.createElement('img');
    albumImg.className = 'imgCanvas';
    canvas.appendChild(albumImg);

    bgCanvas = document.createElement('canvas');
    bgCtx = bgCanvas.getContext("2d");
    canvas.appendChild(bgCanvas);

    resizeCanvas();
    draw();
    bgIntervalId = setInterval(drawBg, 1000 / 2);
    window.addEventListener('resize', resizeCanvas, false);
  }

  return {
    'info': {
      'version': "1.0.0",
      'author': "sona"
    },
    'init': init,
    'drawAlbumImg' : drawAlbumImg,
    'clearBackEffect' : clearBackEffect
  };

})();
