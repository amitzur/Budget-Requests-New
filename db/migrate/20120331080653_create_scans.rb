class CreateScans < ActiveRecord::Migration
  def change
    create_table :scans do |t|
      t.string :filename

      t.timestamps
    end
  end
end
