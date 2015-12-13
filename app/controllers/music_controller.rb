class MusicController < ApplicationController

  def create
    client = Soundcloud.new(:client_id => '5eab25892177da647ada924c74038554')

  # find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
    tracks = client.get('/tracks', :q => 'PITBULL', :limit => 200, :filter => 'public'
    )
    # tracks.each do |track|
    #   p track[:permalink_url]

    # end
    p tracks.shuffle[0][:permalink_url]
    # p tracks.shuffle[0]
    # embedurl = client.get('/oembed', :url => tracks.shuffle[0][:permalink_url])
    # p embedurl
    if request.xhr?
      render :json => {
                        :music => tracks.shuffle[0][:permalink_url]
                      }
    end

        # get a tracks oembed data
    # track_url = 'http://soundcloud.com/forss/flickermood'
    # embed_info = client.get('/oembed', :url => track_url)

    # # print the html for the player widget
    # puts embed_info['html']
  end

end
