

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCWWOEoZVeszdZVZkacIqROh4pTRSsITG8tX1JDZlXvb7-WlRK8dR9JArvt_I4T8tLIht3Z3Fl7v4_oL9NrDKDiQ-yrBdpvzFQS-4OHBUzvjI4Mn-_C2r_ICBd9dRYIleBF6B8EmVCBljLuQZoRIL3fgcrBuBMsYDM4AZupot7rPmAj_eeEs8GXLLEE-X5gJy2EhXIrZAJv-PruIew1mL0yn-hW';
    const player = new Spotify.Player({
        name: 'Jazzify',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.previousTrack().then(() => {
        
    });

    player.nextTrack().then(() => {

    });

    player.getCurrentState().then(state => {
    if (!state) {
    console.error('User is not playing music through the Web Playback SDK');
    return;
      }

      var current_track = state.track_window.current_track;
      var next_track = state.track_window.next_tracks[0];

    });

    document.getElementById('toggleplay').onclick = function() {
      player.togglePlay();
    };

    document.getElementById('next').onclick = function() {
      player.nextTrack();
    };

    document.getElementById('prev').onclick = function() {
      player.previousTrack();
    };

   

    player.connect();
}

$(document).ready(function () {
   var audioElement = document.createElement('audio');
   audioElement.setAttribute('src', $('.active-song').attr('data-src'));

   var tl = new TimelineMax();
   tl.to('.player__albumImg', 3, {
       rotation: '360deg',
       repeat: -1,
       ease: Power0.easeNone 
   }, '-=0.2');
   tl.pause();

   $('.toggleplay').click(function () {

       if ($('.player').hasClass('play')) {
           $('.player').removeClass('play');
           audioElement.pause();
           TweenMax.to('.player__albumImg', 0.2, {
               scale: 1,
               ease: Power0.easeNone
           })
           tl.pause();
       } else {
           $('.player').addClass('play');
           audioElement.play();
           TweenMax.to('.player__albumImg', 0.2, {
               scale: 1.1,
               ease: Power0.easeNone
           })
           tl.resume();
       }

   });


   var playhead = document.getElementById("playhead");
   audioElement.addEventListener("timeupdate", function () {
       var duration = this.duration;
       var currentTime = this.currentTime;
       var percentage = (currentTime / duration) * 100;
       playhead.style.width = percentage + '%';
   });

   function updateInfo() {
       $('.player__author').text($('.active-song').attr('data-author'));
       $('.player__song').text($('.active-song').attr('data-song'));
   }
   updateInfo();

   $('.player__next').click(function () {
       if ($('.player .player__albumImg.active-song').is(':last-child')) {
           $('.player__albumImg.active-song').removeClass('active-song');
           $('.player .player__albumImg:first-child').addClass('active-song');
           audioElement.addEventListener("timeupdate", function () {
               var duration = this.duration;
               var currentTime = this.currentTime;
               var percentage = (currentTime / duration) * 100;
               playhead.style.width = percentage + '%';
           });
       } else {
           $('.player__albumImg.active-song').removeClass('active-song').next().addClass('active-song');
           audioElement.addEventListener("timeupdate", function () {
               var duration = this.duration;
               var currentTime = this.currentTime;
               var percentage = (currentTime / duration) * 100;
               playhead.style.width = percentage + '%';
           });
       }
       updateInfo();
       audioElement.setAttribute('src', $('.active-song').attr('data-src'));
       audioElement.play();
   });

   $('.player__prev').click(function () {
       if ($('.player .player__albumImg.active-song').is(':first-child')) {
           $('.player__albumImg.active-song').removeClass('active-song');
           $('.player .player__albumImg:last-child').addClass('active-song');
           audioElement.addEventListener("timeupdate", function () {
               var duration = this.duration;
               var currentTime = this.currentTime;
               var percentage = (currentTime / duration) * 100;
               playhead.style.width = percentage + '%';
           });
       } else {
           $('.player__albumImg.active-song').removeClass('active-song').prev().addClass('active-song');
           audioElement.addEventListener("timeupdate", function () {
               var duration = this.duration;
               var currentTime = this.currentTime;
               var percentage = (currentTime / duration) * 100;
               playhead.style.width = percentage + '%';
           });
       }
       updateInfo();
       audioElement.setAttribute('src', $('.active-song').attr('data-src'));
       audioElement.play();
   });

});


