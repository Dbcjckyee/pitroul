class MusicController < ApplicationController
  def create
    client = Soundcloud.new(:client_id => ENV["SCID"])
    tracks = client.get('/tracks', :q => 'PITBULL', :limit => 200, :filter => 'public')
    p tracks.shuffle[0][:permalink_url]
    if request.xhr?
      render :json => {
                        :music => tracks.shuffle[0][:permalink_url]
                      }
    end
  end
end
