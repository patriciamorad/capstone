class CreateEventTidbits < ActiveRecord::Migration[5.1]
  def change
    create_table :event_tidbits do |t|
      t.integer :attended_event_id
      t.integer :user_id
      t.string :tidbit

      t.timestamps
    end
  end
end
