include MediaHelper
class MediaController < ApplicationController
  def create
    video = getyoutube[:vid]
    if request.xhr?
      render :json => {
        :link => video
      }
    end
    redirect_to root_path
  end
end
