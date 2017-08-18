/*! sound.js © sonasoeun.me, 2016 */
var sound = (function(soundcloud) {
  'use strict';

  var client_id = "802c2f1c80c96881ff265799929e8a2c";

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
    'author' : "sona",
    'version': "1.0.0",
    '_init' : function(audio) {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext),
          source = audioCtx.createMediaElementSource(audio);

      this.audio = audio;
      this.analyser = audioCtx.createAnalyser();

      this.analyser.fftSize = 256;
      this.analyser.connect(audioCtx.destination);

      this.audio.crossOrigin = "anonymous";
      source.connect(this.analyser);
    },
    'search' : function(trackUrl, successCallback, errorCallback) {
      var that = this;
      soundcloud.resolve(trackUrl)
        .then(function(data){
          if(!data.stream_url){
            errorCallback('Playlist is not supported');
          } else {
            var streamUrl = data.stream_url + '?client_id=' + client_id
              , artworkUrl = data.artwork_url;
            that.audio.setAttribute('src', streamUrl);
            successCallback.call(this,streamUrl,artworkUrl);
          }
      }).catch(function(error){
        errorCallback(error);
      });
    }
  };

  return sound;

})(SC);
