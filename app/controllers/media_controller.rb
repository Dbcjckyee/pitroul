include WelcomeHelper
class MediaController < ApplicationController

  def create
    @video = "http://www.youtube.com/embed/#{main[:vid][20]}"
    respond_to do |filter|
      filter.js
    end
  end

end
