class AddMeetingReasonToBakasha < ActiveRecord::Migration
  def change
    add_column :bakashas, :meeting_reason, :string
  end
end
