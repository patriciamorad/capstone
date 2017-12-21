class V1::EventsController < ApplicationController
  def index 
    events = Event.all 

  end 
end
