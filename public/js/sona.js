/*! sona.js © sonasoeun.me, 2016 */
this.sona = (function(global) {
  'use strict';

  var version = '1.0.0';
  var author  = 'sona';

  var client_id = SOUNDCLOUD_API_KEY;

  SC.initialize({
    client_id: client_id
  });

  function init(trackUrl, successCallback, errorCallback){
    SC.resolve(trackUrl)
      .then(function(data){
        global.streamUrl = data.stream_url + '?client_id=' + client_id;
        global.artworkUrl = data.artwork_url;
        successCallback();
    }).catch(function(error){
        errorCallback(error);
    });
  }

  function play(audio) {
    audio.setAttribute('src', global.streamUrl);
    audio.play();
    makeAudioSource(audio);
  }

  function makeAudioSource(audio) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)
      , source = audioCtx.createMediaElementSource(audio)
      , analyser = audioCtx.createAnalyser();

    analyser.fftSize = 256;
    audio.crossOrigin = "anonymous";
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
  }

  return {
    'info': {
      'version': version,
      'author': author
    },
    'soundcloud' : {
      'init' :  init,
      'play': play
    }
  };

})(this);
