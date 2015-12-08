class WelcomeController < ApplicationController
  def index

client = Yourub::Client.new
client.search(query: "aliens") do |v|
  puts v
end
  end
end
