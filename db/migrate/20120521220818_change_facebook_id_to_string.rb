class ChangeFacebookIdToString < ActiveRecord::Migration
  def up
    change_column :users, :facebook_id, :string
  end

  def down
    change_column :users, :facebook_id, :integer
  end
end
