class Image < ApplicationRecord
  belongs_to :attended_event
  belongs_to :user
end
