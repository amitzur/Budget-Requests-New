class CreateBakashas < ActiveRecord::Migration
  def change
    create_table :bakashas do |t|
      t.date :recv_date
      t.string :reason

      t.timestamps
    end
  end
end
