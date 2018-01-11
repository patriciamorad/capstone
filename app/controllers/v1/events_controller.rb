class V1::EventsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]

  def index 
    response = Unirest.get("http://api.meetup.com/find/upcoming_events?key=#{ENV['MEETUP_API_KEY']}&topic_category=tech&sign=true&page=17&fields=plain_text_description")
    events = response.body["events"]
    p ENV['MEETUP_API_KEY']
    p response.body
    p events

    events.each do |event|
      # response = Unirest.get("http://api.meetup.com/#{event['group']['urlname']}/events/#{event['id']}?key=#{ENV['MEETUP_API_KEY']}&fields=description_images")
      # if response.body['description_images']
      #   images = response.body['description_images'].map { |description_image| description_image['link_path']}
      # else
      #   images = []
      # end
      images = []
      p images
      event["description_images"] = images
    end

    render json: events.as_json
  end 
end
