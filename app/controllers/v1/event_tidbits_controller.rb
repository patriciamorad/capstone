class V1::EventTidbitsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]

  def create
  user_id = current_user.id
  event_tidbit = EventTidbit.new(
    attended_event_id: params[:attended_event_id],
    user_id: user_id,
    tidbit: params[:tidbit])
    if event_tidbit.save
      render json: {message: "Tidbit Saved! Add another!"}
    else
      render json: {errors: event_tidbit.errors.full_messages}, status: :bad_request
    end
  end 
end
