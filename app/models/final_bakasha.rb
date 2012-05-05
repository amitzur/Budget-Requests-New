class FinalBakasha < ActiveRecord::Base
  has_one :scan
  has_many :bakashas
end
