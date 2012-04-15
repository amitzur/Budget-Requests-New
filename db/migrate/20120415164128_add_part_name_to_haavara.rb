class AddPartNameToHaavara < ActiveRecord::Migration
  def change
    add_column :haavaras, :prat_name, :string

  end
end
