class ScansController < ApplicationController

  def index
    @scans = Scan.all
    @title = t(:list_of_scans)
    render :index
  end
end