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
    'search' : function(trackUrl, successCallback, errorCallback){
      soundcloud.resolve(trackUrl)
        .then(function(data){
          if(!data.stream_url){
            errorCallback('Playlist is not supported');
          } else {
            var streamUrl = data.stream_url + '?client_id=' + client_id;
            var artworkUrl = data.artwork_url;
            successCallback.call(this,streamUrl,artworkUrl);
          }
      }).catch(function(error){
        errorCallback(error);
      });
    },
    'play': function(streamUrl){
      this.audio.src = 'data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
      this.audio.setAttribute('src', streamUrl);
      this.audio.play()
    }
  };

  return sound;

})(SC);
