class AddFinalizedToBakasha < ActiveRecord::Migration
  def change
    add_column :bakashas, :finalized, :boolean
  end
end
