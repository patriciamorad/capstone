class V1::AttendedEventsController < ApplicationController

  def create 
    event = AttendedEvent.new(
      user_id: current_user.id,
      api_event_id: params[:api_event_id],
      name: params[:name],
      date: params[:date],
      location: params[:location],
      event_image: params[:image]
      )
    if event.save 
      render json: {status: 'See you there!'}, status: :created 
    else 
      render json: {errors: event.errors.full_messages}, status: :bad_request
    end
  end 

  def index 

    user_id = current_user.id
    attended_events = AttendedEvent.where(user_id: user_id)
    search_terms = params[:search]
    if search_terms
      attended_events = attended_events.where("name ILIKE ?", "%#{params[:search]}%")
    end 
    render json: attended_events.as_json
  end 

  # def text 
  #   # To find these visit https://www.twilio.com/user/account

  #   client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
  #   client.messages.create(
  #     from: ENV['TWILIO_PHONE_NUMBER'],
  #     to: ENV['MY_PHONE_NUMBER'],
  #     body: "If this works, you deserve Portillos Pat"
  #   )
  # end
end


