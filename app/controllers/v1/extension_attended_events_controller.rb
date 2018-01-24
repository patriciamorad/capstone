class V1::ExtensionAttendedEventsController < ApplicationController

  def create 
    extension_attended_event = ExtensionAttendedEvent.new(
      user_id: current_user.id,
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
end
