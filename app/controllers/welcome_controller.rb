
class WelcomeController < ApplicationController
  def index
    vid = main[:vid][0]
    p vid
    p "https://www.youtube.com/watch?v=#{vid}"
  end
end
