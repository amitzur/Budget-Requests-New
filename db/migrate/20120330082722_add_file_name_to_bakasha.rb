class AddFileNameToBakasha < ActiveRecord::Migration
  def change
    add_column :bakashas, :file_name, :string
  end
end
