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
    attr_accessible :recv_date, :meeting_reason, :pniyas_attributes, :scan_id, :description, :finalized, :reserve_usage
    has_many :pniyas

    accepts_nested_attributes_for :pniyas, :reject_if => proc { |p| p[:haavaras_attributes].nil? }

    belongs_to :user
    belongs_to :scan, :counter_cache => true

    def ==(b)
      return false if self.recv_date != b.recv_date
      return false if self.meeting_reason != b.meeting_reason
      self.pniyas == b.pniyas
    end
end
