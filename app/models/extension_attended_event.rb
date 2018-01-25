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
      user_id: user_id,
      image: "https://images.pexels.com/photos/60032/time-calendar-saturday-weekend-60032.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
    }
  end

end
