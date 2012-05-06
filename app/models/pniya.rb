# == Schema Information
#
# Table name: pniyas
#
#  id         :integer         not null, primary key
#  mispar     :integer
#  bakasha_id :integer
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class Pniya < ActiveRecord::Base
    attr_accessible :mispar, :haavaras_attributes
    belongs_to :bakasha
    has_many :haavaras, :order => :id

    accepts_nested_attributes_for :haavaras

    belongs_to :user

    def ==(p)
      return false if self.mispar != p.mispar
      self.haavaras.order(:id) == p.haavaras.order(:id)
    end
end
