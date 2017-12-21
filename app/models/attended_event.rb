class AttendedEvent < ApplicationRecord
  belongs_to :user
  has_many :event_tidbits
  has_many :images 
  has_many :acquaintances
end
