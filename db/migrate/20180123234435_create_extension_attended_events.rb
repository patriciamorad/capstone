class CreateExtensionAttendedEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :extension_attended_events do |t|
      t.string :name
      t.string :location
      t.string :url
      t.integer :user_id

      t.timestamps
    end
  end
end
