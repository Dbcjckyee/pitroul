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

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady(){
  player = new YT.Player('content', {
  events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event){
  if (event.data === 0) {
    nextVideo();
  }
}

function nextVideo(){
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

function embed (id) {
  SC.oEmbed(id,
    {
      auto_play: true,
      width: "100%",
      maxheight: 130
    },
    document.getElementById("scplayer")
  );
}

$(document).ready(function(){

  $('.deadlink').click(function(event){
    event.preventDefault();
  })

  $('#image').click(function(event){
    $('#imageframe').toggle('slow')
    $.getJSON("https://api.giphy.com/v1/gifs/search?q=pitbull&api_key=dc6zaTOxFJmzC&limit=100", function(gifdata){
        var randomnumber=Math.floor(Math.random() * gifdata['data'].length)
        $('#gif').attr("src", gifdata['data'][randomnumber]['embed_url'])
    })
  })

  $('#video').click(function(event){
    if($('#imageframe').is(':visible')){
      $('#imageframe').hide('slow');
    }
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

  $('#music').click(function(event){
    $("body").append('<div class="overlay">');
    if($('#imageframe').is(':visible')){
      $('#imageframe').hide('slow');
    }
    $.ajax({
      method: "POST",
      url: '/music'
    })
    .done(function(result){
      $('#scframe').toggle('slow')
      embed(result['music'])
    })
  })
})

