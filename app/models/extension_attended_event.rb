class ExtensionAttendedEvent < ApplicationRecord
  belongs_to :user
  has_many :event_tidbits
  has_many :images 
  has_many :acquaintances


  def as_json
    {
      id: id,
      name: name,
      location: location,
      url: url,
      user_id: user_id
    }
  end

end
