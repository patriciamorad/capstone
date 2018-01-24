class User < ApplicationRecord
  has_secure_password
  validates :name, :email, presence: true
  has_many :attended_events
  has_many :extension_attended_events
  has_many :event_tidbits
  has_many :images
  has_many :acquaintances  
end
