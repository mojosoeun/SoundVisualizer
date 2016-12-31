(function() {
  'use strict';

  var AnalyserNode, AudioBuffer, AudioBufferSourceNode, AudioContext, AudioDestinationNode, AudioListener, AudioNode, AudioParam, AudioSourceNode, BiquadFilterNode, ChannelMergerNode, ChannelSplitterNode, ConvolverNode, DelayNode, DynamicsCompressorNode, AudioGain, GainNode, JavaScriptNode, MediaElementAudioSourceNode, MediaStreamAudioSourceNode, OscillatorNode, PannerNode, ScriptProcessorNode, WaveShaperNode, WaveTable, PeriodicWave,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) { child[key] = parent[key]; } } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AudioNode = (function() {
    function AudioNode() {}

    AudioNode.prototype.connect = function() {};

    AudioNode.prototype.disconnect = function() {};

    AudioNode.prototype.AudioContext = void 0;

    AudioNode.prototype.numberOfInputs = 1;

    AudioNode.prototype.numberOfOutputs = 1;

    return AudioNode;

  })();

  AudioSourceNode = (function(superClass) {
    extend(AudioSourceNode, superClass);

    function AudioSourceNode() {
      return AudioSourceNode.__super__.constructor.apply(this, arguments);
    }

    AudioSourceNode.prototype.numberOfInputs = 0;

    return AudioSourceNode;

  })(AudioNode);

  AudioDestinationNode = (function(superClass) {
    extend(AudioDestinationNode, superClass);

    function AudioDestinationNode() {
      return AudioDestinationNode.__super__.constructor.apply(this, arguments);
    }

    AudioDestinationNode.prototype.numberOfOutputs = 0;

    return AudioDestinationNode;

  })(AudioNode);

  AudioParam = (function() {
    function AudioParam() {}

    AudioParam.prototype.cancelScheduledValues = function() {};

    AudioParam.prototype.exponentialRampToValueAtTime = function() {};

    AudioParam.prototype.linearRampToValueAtTime = function() {};

    AudioParam.prototype.setTargetValueAtTime = function() {};

    AudioParam.prototype.setValueAtTime = function() {};

    AudioParam.prototype.setValueCurveAtTime = function() {};

    return AudioParam;

  })();

  AudioBufferSourceNode = (function(superClass) {
    extend(AudioBufferSourceNode, superClass);

    function AudioBufferSourceNode() {
      return AudioBufferSourceNode.__super__.constructor.apply(this, arguments);
    }

    return AudioBufferSourceNode;

  })(AudioSourceNode);

  MediaElementAudioSourceNode = (function(superClass) {
    extend(MediaElementAudioSourceNode, superClass);

    function MediaElementAudioSourceNode(mediaElement1) {
      var ref, ref1, type;
      this.mediaElement = mediaElement1;
      type = (ref = this.mediaElement) !== null ? (ref1 = ref.constructor) !== null ? ref1.name : void 0 : void 0;
      if (type !== 'HTMLAudioElement' || type !== 'HTMLVideoElement' || type !== 'HTMLMediaElement') {
        throw new Error('Invalid MediaElement type.');
      }
    }

    return MediaElementAudioSourceNode;

  })(AudioSourceNode);

  MediaStreamAudioSourceNode = (function(superClass) {
    extend(MediaStreamAudioSourceNode, superClass);

    function MediaStreamAudioSourceNode(mediaStream) {
      var ref, ref1, type;
      this.mediaStream = mediaStream;
      type = (ref = this.mediaStream) !== null ? (ref1 = ref.constructor) !== null ? ref1.name : void 0 : void 0;
      if (type !== 'LocalMediaStream') {
        throw new Error('INVALID_STATE_ERR: DOM Exception 11');
      }
    }

    return MediaStreamAudioSourceNode;

  })(AudioSourceNode);

  OscillatorNode = (function(superClass) {
    extend(OscillatorNode, superClass);

    function OscillatorNode() {
      return OscillatorNode.__super__.constructor.apply(this, arguments);
    }

    return OscillatorNode;

  })(AudioSourceNode);

  ScriptProcessorNode = (function(superClass) {
    extend(ScriptProcessorNode, superClass);

    function ScriptProcessorNode(bufferSize1) {
      this.bufferSize = bufferSize1;
      if (this.bufferSize === null) {
        throw new Error('Not enough arguments');
      }
    }

    return ScriptProcessorNode;

  })(AudioNode);

  JavaScriptNode = (function(superClass) {
    extend(JavaScriptNode, superClass);

    function JavaScriptNode(bufferSize1) {
      this.bufferSize = bufferSize1;
      if (this.bufferSize === null) {
        throw new Error('Not enough arguments');
      }
    }

    return JavaScriptNode;

  })(AudioNode);

  AnalyserNode = (function(superClass) {
    extend(AnalyserNode, superClass);

    function AnalyserNode() {
      return AnalyserNode.__super__.constructor.apply(this, arguments);
    }

    return AnalyserNode;

  })(AudioNode);

  AudioGain = (function(superClass) {
    extend(AudioGain, superClass);

    function AudioGain() {
      return AudioGain.__super__.constructor.apply(this, arguments);
    }

    return AudioGain;

  })(AudioParam);

  GainNode = (function(superClass) {
    extend(GainNode, superClass);

    function GainNode() {
      this.gain = new AudioGain();
    }

    return GainNode;

  })(AudioNode);

  DelayNode = (function(superClass) {
    extend(DelayNode, superClass);

    function DelayNode() {
      return DelayNode.__super__.constructor.apply(this, arguments);
    }

    return DelayNode;

  })(AudioNode);

  BiquadFilterNode = (function(superClass) {
    extend(BiquadFilterNode, superClass);

    function BiquadFilterNode() {
      return BiquadFilterNode.__super__.constructor.apply(this, arguments);
    }

    return BiquadFilterNode;

  })(AudioNode);

  WaveShaperNode = (function(superClass) {
    extend(WaveShaperNode, superClass);

    function WaveShaperNode() {
      return WaveShaperNode.__super__.constructor.apply(this, arguments);
    }

    return WaveShaperNode;

  })(AudioNode);

  PannerNode = (function(superClass) {
    extend(PannerNode, superClass);

    function PannerNode() {
      return PannerNode.__super__.constructor.apply(this, arguments);
    }

    return PannerNode;

  })(AudioNode);

  ConvolverNode = (function(superClass) {
    extend(ConvolverNode, superClass);

    function ConvolverNode() {
      return ConvolverNode.__super__.constructor.apply(this, arguments);
    }

    return ConvolverNode;

  })(AudioNode);

  ChannelSplitterNode = (function(superClass) {
    extend(ChannelSplitterNode, superClass);

    function ChannelSplitterNode() {
      return ChannelSplitterNode.__super__.constructor.apply(this, arguments);
    }

    return ChannelSplitterNode;

  })(AudioNode);

  ChannelMergerNode = (function(superClass) {
    extend(ChannelMergerNode, superClass);

    function ChannelMergerNode() {
      return ChannelMergerNode.__super__.constructor.apply(this, arguments);
    }

    return ChannelMergerNode;

  })(AudioNode);

  DynamicsCompressorNode = (function(superClass) {
    extend(DynamicsCompressorNode, superClass);

    function DynamicsCompressorNode() {
      return DynamicsCompressorNode.__super__.constructor.apply(this, arguments);
    }

    return DynamicsCompressorNode;

  })(AudioNode);

  WaveTable = (function() {
    function WaveTable() {}

    return WaveTable;

  })();

  AudioListener = (function() {
    function AudioListener() {}

    AudioListener.prototype.dopplerFactor = 1;

    AudioListener.prototype.speedOfSound = 343.3;

    return AudioListener;

  })();

  AudioBuffer = (function() {
    function AudioBuffer(numberOfChannels, length1, sampleRate) {
      this.numberOfChannels = numberOfChannels;
      this.length = length1;
      this.sampleRate = sampleRate;
    }

    AudioBuffer.prototype.gain = 1;

    AudioBuffer.prototype.duration = 0;

    return AudioBuffer;

  })();

  PeriodicWave = (function() {
    function PeriodicWave() {}

    return PeriodicWave;
  })();

  AudioContext = (function() {
    function AudioContext() {
      this.destination = new AudioDestinationNode();
      this.listener = new AudioListener();
    }

    AudioContext.prototype.activeSourceCount = 0;

    AudioContext.prototype.sampleRate = 44100;

    AudioContext.prototype.currentTime = 0;

    AudioContext.prototype.createBuffer = function(channels, length, rate) {
      return new AudioBuffer(channels, length, rate);
    };

    AudioContext.prototype.decodeAudioData = function() {};

    AudioContext.prototype.createBufferSource = function() {
      return new AudioBufferSourceNode();
    };

    AudioContext.prototype.createMediaElementSource = function(mediaElement) {
      return new MediaElementAudioSourceNode(mediaElement);
    };

    AudioContext.prototype.createMediaStreamSource = function() {
      return new MediaStreamAudioSourceNode();
    };

    AudioContext.prototype.createOscillator = function() {
      return new OscillatorNode();
    };

    AudioContext.prototype.createScriptProcessor = function(bufferSize) {
      return new ScriptProcessorNode(bufferSize);
    };

    AudioContext.prototype.createAnalyser = function() {
      return new AnalyserNode();
    };

    AudioContext.prototype.createGain = function() {
      return new GainNode();
    };

    AudioContext.prototype.createDelay = function() {
      return new DelayNode();
    };

    AudioContext.prototype.createBiquadFilter = function() {
      return new BiquadFilterNode();
    };

    AudioContext.prototype.createWaveShaper = function() {
      return new WaveShaperNode();
    };

    AudioContext.prototype.createPanner = function() {
      return new PannerNode();
    };

    AudioContext.prototype.createConvolver = function() {
      return new ConvolverNode();
    };

    AudioContext.prototype.createChannelSplitter = function() {
      return new ChannelSplitterNode();
    };

    AudioContext.prototype.createChannelMerger = function() {
      return new ChannelMergerNode();
    };

    AudioContext.prototype.createDynamicsCompressor = function() {
      return new DynamicsCompressorNode();
    };

    AudioContext.prototype.createWaveTable = function() {
      throw new Error("createWaveTable is obsolete. Use createPeriodicWave instead.");
    };

    AudioContext.prototype.createPeriodicWave = function() {
      return new PeriodicWave();
    };

    AudioContext.prototype.createJavaScriptNode = function(bufferSize) {
      return new JavaScriptNode(bufferSize);
    };

    AudioContext.prototype.createGainNode = function() {
      return this.createGain();
    };

    AudioContext.prototype.createDelayNode = function() {
      return this.createDelay();
    };

    return AudioContext;

  })();

  window.AudioContext = AudioContext;

})();
