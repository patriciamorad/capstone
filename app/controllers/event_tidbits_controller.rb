class EventTidbitsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]

  def create 
    attended_event =AttendedEvent.find_by(id: )
    event_tidbit = EventTidbit.new(
      attended_event_id: 
      user_id: current_user.id,
      tidbit: params["input_tidbit"]
      )
  end 
end
