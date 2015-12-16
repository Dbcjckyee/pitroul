include MediaHelper
class MediaController < ApplicationController
  def create
    video = "#{getyoutube[:vid][0]}"
    if request.xhr?
      render :json => {
        :link => video
      }
    end
  end
end
