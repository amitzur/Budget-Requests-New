class AddReserveUsageToBakasha < ActiveRecord::Migration
  def change
    add_column :bakashas, :reserve_usage, :boolean

  end
end
