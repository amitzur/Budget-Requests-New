class Scan < ActiveRecord::Base
  has_many :bakashas
  belongs_to :final_bakasha
end
