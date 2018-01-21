class V1::EventTidbitsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]


  def create
    user_id = current_user.id
    event_tidbit = EventTidbit.new(
      attended_event_id: params[:attended_event_id],
      user_id: user_id,
      tidbit: params[:tidbit]
    )
    if event_tidbit.save
    #   attended_event = AttendedEvent.find_by(id: params[:attended_event_id])
    #   event_date = attended_event.date
    #   event_time = attended_event.time
    #   ENV['TZ'] = Time.zone.name # This is only a rails thing..
      # rufus_time = '#{event_date} #{event_time} #{ENV['TZ']}'
      # rufus_time = event_date.strftime("%Y/%m/%d") + " 9:00:00 America/Chicago"
      Rufus::Scheduler.singleton.in '10s' do
          client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
          client.messages.create(
            from: ENV['TWILIO_PHONE_NUMBER'],
            to: ENV['MY_PHONE_NUMBER'],
            body: event_tidbit.tidbit 
          )
      end   
      render json: {message: "Tidbit Saved! Add another!"}
    else
      render json: {errors: event_tidbit.errors.full_messages}, status: :bad_request
    end
  end 
end
