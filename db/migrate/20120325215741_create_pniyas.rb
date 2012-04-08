class CreatePniyas < ActiveRecord::Migration
  def change
    create_table :pniyas do |t|
      t.integer :mispar
      t.integer :bakasha_id

      t.timestamps
    end
  end
end
