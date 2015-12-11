include MediaHelper
class MediaController < ApplicationController

  def create
    @video = "#{main[:vid][0]}"
    p @video
    respond_to do |filter|
      filter.js
    end
  end

end
