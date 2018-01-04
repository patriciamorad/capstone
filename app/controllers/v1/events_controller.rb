class V1::EventsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]

  def index 
    puts "-" * 50
    p ENV['MEETUP_API_KEY']
    puts "-" * 50
    response = Unirest.get("http://api.meetup.com/find/upcoming_events?key=#{ENV['MEETUP_API_KEY']}&topic_category=tech&sign=true&page=20&fields=plain_text_description")
    events = response.body["events"]
    render json: events.as_json
  end 
end
