class V1::ExtensionAttendedEventsController < ApplicationController

  def create 
    extension_attended_event = ExtensionAttendedEvent.new(
      user_id: 2,
      name: params[:name],
      location: params[:location],
      url: params[:url]
      )
    if extension_attended_event.save 
      render json: {status: 'See you there!'}, status: :created 
    else 
      render json: {errors: extension_attended_event.errors.full_messages}, status: :bad_request
    end
  end 

  def index 
    # user_id = current_user.id
    extension_attended_events = ExtensionAttendedEvent.where(user_id: 2)
    search_terms = params[:search]
    # if search_terms
    #   extended_attended_events = extension_attended_events.where("name ILIKE ?", "%#{params[:search]}%")
    # end 
    render json: extension_attended_events.as_json
  end 
end
