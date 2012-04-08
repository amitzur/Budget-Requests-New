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

require 'test_helper'

class BakashaTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
