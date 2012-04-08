class AddPniyaIdToHaavara < ActiveRecord::Migration
  def change
    add_column :haavaras, :pniya_id, :integer
  end
end
