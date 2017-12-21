class CreateAcquaintances < ActiveRecord::Migration[5.1]
  def change
    create_table :acquaintances do |t|
      t.integer :attended_event_id
      t.integer :user_id
      t.string :name
      t.string :job_title
      t.string :notes

      t.timestamps
    end
  end
end
