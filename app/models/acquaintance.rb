class Acquaintance < ApplicationRecord
  belongs_to :attended_event
  belongs_to :extension_attended_event
  belongs_to :user 
end
