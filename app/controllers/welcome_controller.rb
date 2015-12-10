
class WelcomeController < ApplicationController
  def index
    @video = "http://www.youtube.com/embed/#{main[:vid][0]}"

  end
end
