class MediaController < ApplicationController

  def create
    @video = "http://www.youtube.com/embed/#{main[:vid][0]}"
    p @video
    respond_to do |filter|
      filter.js
    end
  end

end
