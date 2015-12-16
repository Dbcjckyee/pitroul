require 'rubygems'
require 'google/api_client'
require 'trollop'
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
    opts = Trollop::options do
      opt :q, 'Search term', :type => String, :default => 'pitbull music'
      opt :max_results, 'Max results', :type => :int, :default => 50
      # opt :channel, "Channel", :type => :string, :default => "UCVWA4btXTFru9qM06FceSag"
    end

    client, youtube = get_service

    begin
      search_response = client.execute!(
        :api_method => youtube.search.list,
        :parameters => {
          :part => 'snippet',
          :q => opts[:q],
          :maxResults => opts[:max_results],
          :order => "relevance",
          :type => "video",
          :pageToken => ["CGQQAA", "CDIQAA", "CJYBEAA", "CMgBEAA", "CPoBEAA", "CKwCEAA", "CN4CEAA", "CJADEAA", ""].sample
        }
      )
    videos = []
    search_response.data.items.each do |search_result|
      case search_result.id.kind
        when 'youtube#video'
          videos << "#{search_result.id.videoId}"
      end
    end

    rescue Google::APIClient::TransmissionError => e
      puts e.result.body
    end
    results = {
      vid: videos.shuffle
    }
    p search_response.data["nextPageToken"]
    return results
  end
end
