/*! sound.js © sonasoeun.me, 2016 */
var sound = (function(soundcloud) {
  'use strict';

  var client_id = SOUNDCLOUD_API_KEY;

  function sound(audio) {
    if ( !(this instanceof sound) ) {
      soundcloud.initialize({
        client_id: client_id
      });

      return new sound(audio);
    }
    this._init.apply(this, arguments);
  }


  sound.fn = sound.prototype = {
    'constructor': sound,
    'author' : 'sona',
    'version': '1.0.0',
    '_init' : function(audio) {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)
        , source = audioCtx.createMediaElementSource(audio)

      this.audio = audio;
      this.analyser = audioCtx.createAnalyser();

      this.analyser.fftSize = 256;
      this.analyser.connect(audioCtx.destination);

      this.audio.crossOrigin = "anonymous";
      source.connect(this.analyser);
    },
    'search' : function(trackUrl, successCallback, errorCallback){
      soundcloud.resolve(trackUrl)
        .then(function(data){
          var streamUrl = data.stream_url + '?client_id=' + client_id;
          var artworkUrl = data.artwork_url;
          successCallback.call(this,streamUrl,artworkUrl);
      }).catch(function(error){
          errorCallback(error);
      });
    },
    'play': function(streamUrl){
      this.audio.setAttribute('src', streamUrl);
      this.audio.play();
    }
  }

  return sound;

})(SC);
