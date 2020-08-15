"use strict";

//var audioContext = new AudioContext();

function audioFileLoader(fileDirectory) {
    var playSound = undefined;
    var soundObj = {};

    var getSound = new XMLHttpRequest();
    soundObj.fileDirectory = fileDirectory;
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    };

    getSound.send();

    soundObj.play = function(time) {
        playSound = audioContext.createBufferSource();
        playSound.buffer = soundObj.soundToPlay;
        multibandEQ(playSound, audioContext.destination)
        playSound.start(audioContext.currentTime + time || audioContext.currentTime);
    };

    soundObj.stop = function() {
        playSound.stop(audioContext.currentTime);
    };
    return soundObj;
}


function audioBatchLoader(obj) {

    for (var prop in obj) {
        obj[prop] = audioFileLoader(obj[prop]);

    }

    return obj;

}