class MusicController < ApplicationController
  def create
    client = Soundcloud.new(:client_id => ENV["SCID"])
    tracks = client.get('/tracks', :q => 'PITBULL', :limit => 200, :filter => 'public')
    if request.xhr?
      render :json => {
        :music => tracks.shuffle[0][:permalink_url]
      }
    end
    redirect_to root_path
  end
end
