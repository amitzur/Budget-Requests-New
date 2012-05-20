class ScansController < ApplicationController

  def index
    @scans = Scan.all
    @title = t(:list_of_scans)
    render :index, :layout => "thin_layout"
  end
end