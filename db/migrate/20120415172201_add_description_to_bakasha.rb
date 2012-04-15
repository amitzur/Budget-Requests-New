class AddDescriptionToBakasha < ActiveRecord::Migration
  def change
    add_column :bakashas, :description, :text

  end
end
