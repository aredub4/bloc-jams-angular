(function() {
  function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();
          var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
 };
          SongPlayer.currentSong = null;
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

              currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });

              SongPlayer.currentSong = song;
              /**
               * @desc Current playback time (in seconds) of currently playing song
               * @type {Number}
               */
              SongPlayer.currentTime = null;
           };

           /**
            * @function setCurrentTime
            * @desc Set current time (in seconds) of currently playing song
            * @param {Number} time
            */
            SongPlayer.setCurrentTime = function(time) {
                if (currentBuzzObject) {
                    currentBuzzObject.setTime(time);
                }
            };

          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (currentSong !== song) {
              setSong(song);

               } else if (currentSong === song) {
           if (currentBuzzObject.isPaused()) {
               currentBuzzObject.play();
               song.playing = true;
           }
       };
              SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
               currentBuzzObject.pause();
               song.playing = false;
         };
         SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;
          if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       } else {
       var song = currentAlbum.songs[currentSongIndex];
       setSong(song);
       playSong(song);
   }
};

                   currentBuzzObject.play();
                 }
               };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
