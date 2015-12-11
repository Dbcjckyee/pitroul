require 'rubygems'
require 'google/api_client'
require 'trollop'
gem 'google-api-client', '>0.7'

DEVELOPER_KEY = 'AIzaSyDfP0U1mHMeycwlsm1kWCCSQrgUCDJU9J8'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

class ApplicationController < ActionController::Base

  def iframe_action
    response.headers.delete "X-Frame-Options"
    render_something
  end
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


end
