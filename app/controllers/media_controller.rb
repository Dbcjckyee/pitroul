include MediaHelper
class MediaController < ApplicationController
  def create
    video = getyoutube[:vid]
    if request.xhr?
      render :json => {
        :link => video
      }
    end
  end
end
