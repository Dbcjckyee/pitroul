class WelcomeController < ApplicationController
  def index
    @videos = []
    client = Yourub::Client.new
    client.search(query: "aliens") do |v|
      @videos << v
    end
  end
end
