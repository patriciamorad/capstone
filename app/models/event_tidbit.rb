class EventTidbit < ApplicationRecord
  belongs_to :attended_event, optional: true
  belongs_to :extension_attended_event, optional: true
  belongs_to :user
end
