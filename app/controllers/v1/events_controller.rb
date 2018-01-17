class V1::EventsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]

  def index 
    response = Unirest.get("http://api.meetup.com/find/upcoming_events?key=#{ENV['MEETUP_API_KEY']}&topic_category=tech&sign=true&page=#{params[:count]}&fields=plain_text_description")
    events = response.body["events"]

    events.each do |event|
      # response = Unirest.get("http://api.meetup.com/#{event['group']['urlname']}/events/#{event['id']}?key=#{ENV['MEETUP_API_KEY']}&fields=description_images")
      # if response.body['description_images']
      #   images = response.body['description_images'].map { |description_image| description_image['link_path']}
      # else
      #   images = []
      # end
      index = 0 
      images = ["img/events/event1.jpg","img/events/event2.jpg", "img/events/event3.jpg", "img/events/event4.jpg", "img/events/event5.jpg", "img/events/event6.jpg", "img/events/event7.jpg","img/events/event8.jpg", "img/events/event9.jpg", "img/events/event10.jpg", "img/events/event11.jpg", "img/events/event12.jpg", "img/events/event13.jpg"]
      event["description_images"] = [images.sample]
      p images
    end

    render json: events.as_json
  end 

  def show
    response = Unirest.get("http://api.meetup.com/#{params[:urlname]}/events/#{params[:id]}?key=#{ENV['MEETUP_API_KEY']}")
    event = response.body
    puts "-" * 50
    puts "The event is..."
    p event
    puts "-" * 50
    render json: event.as_json
  end
end
