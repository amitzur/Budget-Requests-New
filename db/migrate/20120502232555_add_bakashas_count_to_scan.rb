class AddBakashasCountToScan < ActiveRecord::Migration
  def change
    add_column :scans, :bakashas_count, :integer, :default => 0

    Scan.reset_column_information
    Scan.find(:all).each do |s|
      Scan.update_counters s.id, :bakashas_count => s.bakashas.length
    end
  end
end
