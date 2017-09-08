(function() {
     function SongPlayer() {
          var SongPlayer = {};

          var currentSong = null;
          var currentBuzzObject = null;
          /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  /**
                  * @desc Buzz object audio file
                  * @type {Object}
                  */
                  currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentSong = song;
           };

          SongPlayer.play = function(song) {
            if (currentSong !== song) {
              setSong(song);

               } else if (currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               currentBuzzObject.play();
               song.playing = true;
           }
       };
               SongPlayer.pause = function(song) {
               currentBuzzObject.pause();
               song.playing = false;
         };
                   currentBuzzObject.play();
                 }
               };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
