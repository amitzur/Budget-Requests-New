class CreateHaavaras < ActiveRecord::Migration
  def change
    create_table :haavaras do |t|
      t.integer :prat
      t.integer :hotsaa_from
      t.integer :hotsaa_to
      t.integer :hotsaa_mut_from
      t.integer :hotsaa_mut_to
      t.integer :harshaa_from
      t.integer :harshaa_to
      t.integer :ska_from
      t.integer :ska_to
      t.integer :diff_hotsaa
      t.integer :diff_hotsaa_mut
      t.integer :diff_harshaa
      t.integer :diff_ska

      t.timestamps
    end
  end
end
