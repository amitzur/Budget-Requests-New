# == Schema Information
#
# Table name: haavaras
#
#  id              :integer         not null, primary key
#  prat            :integer
#  hotsaa_from     :integer
#  hotsaa_to       :integer
#  hotsaa_mut_from :integer
#  hotsaa_mut_to   :integer
#  harshaa_from    :integer
#  harshaa_to      :integer
#  ska_from        :integer
#  ska_to          :integer
#  diff_hotsaa     :integer
#  diff_hotsaa_mut :integer
#  diff_harshaa    :integer
#  diff_ska        :integer
#  created_at      :datetime        not null
#  updated_at      :datetime        not null
#  pniya_id        :integer
#

class Haavara < ActiveRecord::Base
    attr_accessible :prat, :prat_name, :hotsaa_from, :hotsaa_to, :hotsaa_mut_from, :hotsaa_mut_to, :harshaa_from, :harshaa_to, :ska_from, :ska_to, :diff_hotsaa, :diff_hotsaa_mut, :diff_harshaa, :diff_ska

    belongs_to :pniya
    belongs_to :user

    def ==(h)
      return false if self.prat != h.prat
      return false if self.hotsaa_from != h.hotsaa_from
      return false if self.hotsaa_to != h.hotsaa_to
      return false if self.hotsaa_mut_from != h.hotsaa_mut_from
      return false if self.hotsaa_mut_to != h.hotsaa_mut_to
      return false if self.harshaa_from != h.harshaa_from
      return false if self.harshaa_to != h.harshaa_to
      return false if self.ska_from != h.ska_from
      return false if self.ska_to != h.ska_to
      return false if self.diff_hotsaa != h.diff_hotsaa
      return false if self.diff_hotsaa_mut != h.diff_hotsaa_mut
      return false if self.diff_harshaa != h.diff_harshaa
      self.diff_ska == h.diff_ska
    end
end
