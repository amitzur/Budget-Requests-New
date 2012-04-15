# == Schema Information
#
# Table name: bakashas
#
#  id             :integer         not null, primary key
#  recv_date      :date
#  reason         :string(255)
#  created_at     :datetime        not null
#  updated_at     :datetime        not null
#  meeting_reason :string(255)
#  file_name      :string(255)
#

class Bakasha < ActiveRecord::Base
    attr_accessible :recv_date, :meeting_reason, :pniyas_attributes, :scan_id, :description
    has_many :pniyas

    accepts_nested_attributes_for :pniyas

    belongs_to :user
end
