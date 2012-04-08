class AddUserIdToBakasha < ActiveRecord::Migration
  def change
    add_column :bakashas, :user_id, :integer
    add_column :pniyas, :user_id, :integer
    add_column :haavaras, :user_id, :integer
  end
end
