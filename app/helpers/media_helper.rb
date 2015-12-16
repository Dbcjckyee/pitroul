require 'rubygems'
require 'google/api_client'
gem 'google-api-client', '>0.7'

YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

module MediaHelper
  def get_service
    client = Google::APIClient.new(
      :key => ENV["YT"],
      :authorization => nil,
      :application_name => $PROGRAM_NAME,
      :application_version => '1.0.0'
    )
    youtube = client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)

    return client, youtube
  end

  def getyoutube


    client, youtube = get_service

    begin
      search_response = client.execute!(
        :api_method => youtube.search.list,
        :parameters => {
          :part => 'snippet',
          :q => 'pitbull music',
          :maxResults => 50,
          :order => "relevance",
          :type => "video",
          :pageToken => ["CGQQAA", "CDIQAA", "CJYBEAA", "CMgBEAA", "CPoBEAA", "CKwCEAA", "CN4CEAA", "CJADEAA", ""].sample
        }
      )
    generator = Random.new
    # search_response.data.items[generator.rand(50)].id.videoId
    # videos = []
    # search_response.data.items.each do |search_result|
    #   case search_result.id.kind
    #     when 'youtube#video'
    #       videos << "#{search_result.id.videoId}"
    #   end
    # end

    rescue Google::APIClient::TransmissionError => e
      puts e.result.body
    end
    results = {
      vid: search_response.data.items[generator.rand(50)].id.videoId
    }
    return results
  end
end
