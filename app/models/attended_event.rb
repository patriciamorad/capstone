class AttendedEvent < ApplicationRecord
  belongs_to :user
  has_many :event_tidbits
  has_many :images 
  has_many :acquaintances

  def as_json
    {
      id: id,
      api_event_id: api_event_id,
      date: date,
      location: location,
      name: name,
      event_image: event_image,
      tidbits: event_tidbits
    }
  end
end
