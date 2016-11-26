/*! audio_helper.js © sonasoeun.me, 2016 */
this.audio_helper = (function(global, $) {
  'use strict';

  var version = '1.0.0'
      , author  = 'sona'
      , client_id = SOUNDCLOUD_API_KEY
      , audio = $.query('.ctrgroup__player__audio')
      , audioCtx = new (window.AudioContext || window.webkitAudioContext)
      , source = audioCtx.createMediaElementSource(audio)
      , analyser = audioCtx.createAnalyser();

  analyser.fftSize = 256;
  audio.crossOrigin = "anonymous";
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

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

  function play() {
    audio.setAttribute('src', global.streamUrl);
    audio.play();
  }

  return {
    'info': {
      'version': version,
      'author': author
    },
    'analyser': analyser,
    'soundcloud' : {
      'init' :  init,
      'play': play
    }
  };

})(this, this.dom_helper);
