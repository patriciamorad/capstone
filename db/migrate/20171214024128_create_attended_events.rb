class CreateAttendedEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :attended_events do |t|
      t.integer :api_event_id
      t.string :name
      t.datetime :date
      t.string :location
      t.string :event_image
      t.integer :user_id

      t.timestamps
    end
  end
end
