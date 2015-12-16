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
var vidcount = 0;
var vidarray = [];

function nextVideo() {
 var checknext = new Promise(function(resolve,reject){
  if(vidcount == vidarray.length-1){
    $.ajax({
      method: "POST",
      url: '/media'
    })
    .done(function(data){
      vidarray.push(data['link']);
      resolve();
    })
  }
  else {
    resolve();
    }
  });
  checknext.then(function(){
    vidcount++
    player.loadVideoById(vidarray[vidcount])
  })
}

$(document).ready(function(){

  $('.deadlink').click(function(event){
    event.preventDefault();
  })

  $('#image').click(function(event){
    $('#imageframe').toggle('slow')
    $.getJSON("http://api.giphy.com/v1/gifs/search?q=pitbull&api_key=dc6zaTOxFJmzC&limit=100", function(data){
        var randomnumber=Math.floor(Math.random() * data['data'].length)
        $('#gif').attr("src", data['data'][randomnumber]['embed_url'])
    })

  })

  $('#video').click(function(event){
    $('#imageframe').hide('slow');
    $('#videoframe').toggle('slow')
    $("body").append('<div class="overlay">');
    $.ajax({
      method: "POST",
      url: '/media'
    })
    .done(function(data){
      vidarray.push(data['link'])
      vidcount = vidarray.length-1
      player.loadVideoById(vidarray[vidcount])
      //when #video is clicked, vidcount is automatically moved to the far right end regardless of where vidcount currently is.
    })
  })

  $('#prev').click(function(event){
    if(vidcount > 0){
      vidcount --;
    }
    player.loadVideoById(vidarray[vidcount])
  })

  $('#next').click(function(event){
    nextVideo();
  })


  $('.close').click(function(event){
    $(this).parent().toggle('slow');
    if ($(this).parent().attr('id') != 'imageframe'){
      $('.overlay').fadeOut("slow").remove();
      if ($(this).parent().attr('id') == 'videoframe'){
        player.pauseVideo()
      }
      else{
        $('#scplayer').html('')
      }
    }
  })
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
    nextVideo();
  }
}

