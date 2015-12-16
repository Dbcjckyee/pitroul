
class ApplicationController < ActionController::Base

  def iframe_action
    response.headers.delete "X-Frame-Options"
    render_something
  end
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


end
