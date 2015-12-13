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
$(document).ready(function(){
  $('#video').click(function(event){
    event.preventDefault();
    $('#player').toggle('slow')
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
    event.preventDefault();
    if(vidcount > 0){
      vidcount -= 1;
      player.loadVideoById(vidarray[vidcount])
      console.log(vidcount)
    }
    else{
      player.loadVideoById(vidarray[vidcount])
    }
  })

  $('#next').click(function(event){
    // loadPlayer(event, '/media')
    event.preventDefault();
    nextVideo();

  })

  $('#music').click(function(event){
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: '/music'
    })
    .done(function(result){
      $('#scframe').toggle('slow')
      embed(result['music'])
      // $('#scplayer').attr("src", result['music']);
    })
  })

  $('#close').click(function(event){
    event.preventDefault();
    $('.overlay').fadeOut("slow").remove();
    $('#player').toggle('slow')
    player.pauseVideo()
  })

  $('#close2').click(function(event){
    event.preventDefault();
    $('#scframe').toggle('slow')
    $('#scplayer').html('')

    // $('#content').attr("src", "");
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
// function stopVideo() {
//   player.stopVideo();
// }
SC.initialize({
    // This is the sample client_id. you should replace this with your own
    client_id: "5eab25892177da647ada924c74038554"
});

function embed (id) {
  console.log(id)
  SC.oEmbed(id // user or playlist to embed
    , { auto_play: true
      , width: "100%"
      , maxheight: 130
 } // options
    , document.getElementById("scplayer") // what element to attach player to
  );
}

  function nextVideo(){
    if(vidcount == vidarray.length-1){
        $.ajax({
          method: "POST",
          url: '/media'
        })
        .done(function(data){
          vidcount += 1
          vidarray.push(data['link'])
          player.loadVideoById(vidarray[vidcount])
          console.log(vidcount)
        })
      }
    else{
      vidcount += 1
      player.loadVideoById(vidarray[vidcount])
    }
  }
