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

    accepts_nested_attributes_for :haavaras, :reject_if => proc { |h| h[:prat].blank? and h[:hotsaa_from].blank? and h[:hotsaa_to].blank? and h[:hotsaa_mut_from].blank? and h[:hotsaa_mut_to].blank? and h[:harshaa_from].blank? and h[:harshaa_to].blank? and h[:ska_from].blank? and h[:ska_to].blank? and h[:diff_hotsaa].blank? and h[:diff_hotsaa_mut].blank? and h[:diff_harshaa].blank? and h[:diff_ska].blank? }

    belongs_to :user

    def ==(p)
      return false if self.mispar != p.mispar
      self.haavaras == p.haavaras
    end
end
