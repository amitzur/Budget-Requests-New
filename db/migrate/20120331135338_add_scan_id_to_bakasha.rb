class AddScanIdToBakasha < ActiveRecord::Migration
  def change
    add_column :bakashas, :scan_id, :integer
  end
end
