class CreateFinalBakashas < ActiveRecord::Migration
  def change
    create_table :final_bakashas do |t|
      t.timestamps
    end

    add_column :scans, :final_bakasha_id, :integer
    add_column :bakashas, :final_bakasha_id, :integer
  end
end
