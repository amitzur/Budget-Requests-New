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

require 'test_helper'

class HaavaraTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
