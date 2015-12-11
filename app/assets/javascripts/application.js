// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).ready(function(){
  $('#video').click(function(event){
    loadPlayer(event, '/media');
    $('#player').toggle('slow')
    $("body").append('<div class="overlay">');
  })

  $('#music').click(function(event){
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: '/music'
    })
  })

  $('#close').click(function(event){
    event.preventDefault();
    $('.overlay').fadeOut("slow").remove();
    $('#player').toggle('slow')
    $('#content').attr("src", "");
  })


  $('#next').click(function(event){
      loadPlayer(event, '/media')
  })

  function loadPlayer(trigger, path){
    trigger.preventDefault();
    $.ajax({
      method: "POST",
      url: path
    })
  }


})
 // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('content', {

      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.


  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  function onPlayerStateChange(event) {
    if (event.data === 0) {
      $.ajax({
      method: "POST",
      url: '/media'
    })
      }
  }
  // function stopVideo() {
  //   player.stopVideo();
  // }