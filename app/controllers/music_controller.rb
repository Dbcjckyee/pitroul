class MusicController < ApplicationController

  def create
    client = Soundcloud.new(:client_id => '5eab25892177da647ada924c74038554')

  # find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
    tracks = client.get('/tracks', :q => 'PITBULL', :limit => 200, :filter => 'public'
    )
    i = 0
    tracks.each do |track|
      p track[:genre]
      i += 1
      p i
    end
  end

end
