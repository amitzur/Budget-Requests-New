class ApplicationController < ActionController::Base
  protect_from_forgery

  require 'net/http'
  respond_to :json

  def index
    scans = Scan.all
    @untagged = []
    @tagged = []
    scans.each do |scan|
      b = Bakasha.find_by_scan_id(scan.id)
      if b.nil?
        @untagged << Scan.find(scan.id)
      else
        @tagged << { :bakasha => b, :scan => scan }
      end
    end
    @heading = 'welcome'
  end

  def get_budget
    url = 'http://budget.msh.gov.il/' + params[:id] + '?full=0&num=1&year=2011'
    resp = Net::HTTP.get_response(URI.parse(url))
    if resp.code.to_i >= 200 and resp.code.to_i < 300
      data = resp.body
      j = JSON.parse(data)
      if j[0].nil?
        name = '-'
      else
        name = j[0]['title']
      end
    else
      name = '-'
    end
    respond_with({ :haavara_name => name })
  end

end
