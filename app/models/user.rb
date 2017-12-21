class User < ApplicationRecord
  has_secure_password
  has_many :attended_events
  has_many :event_tidbits
  has_many :images
  has_many :acquaintances  
end