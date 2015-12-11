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
    // event.preventDefault();
    // $('#player').toggle('slow')
    $("body").append('<div class="overlay">');
    // $.ajax({
    //   method: "POST",
    //   url: '/media'
    // })
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
    $('.overlay').fadeOut("slow", function() { $(this).remove(); });
    $('#player').toggle('slow')
    $('#content').attr("src", "");
  })


  $('#next').click(function(event){
      loadPlayer(event, '/media')
    //   event.preventDefault();
    //   $.ajax({
    //   method: "POST",
    //   url: '/media'
    // })
  })

  function loadPlayer(trigger, path){
    trigger.preventDefault();
    $.ajax({
      method: "POST",
      url: path
    })
  }
})