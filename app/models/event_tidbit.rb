class EventTidbit < ApplicationRecord
  belongs_to :attended_event
  belongs_to :user
end
