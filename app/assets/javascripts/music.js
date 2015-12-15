$(document).ready(function(){
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
})


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