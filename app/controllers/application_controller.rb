class ApplicationController < ActionController::Base
  protect_from_forgery

  require 'net/http'
  respond_to :json

  def index
    @heading = 'welcome'
    @title = t('welcome')
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

  def start
    @tagged = FinalBakasha.all
    untagged = Scan.all(:conditions => { :final_bakasha_id => nil })
    untagged_with_bakasha = untagged.select { |s| s.bakashas_count > 0 }
    if untagged_with_bakasha.length > 0
      @next_scan = untagged_with_bakasha[rand(untagged_with_bakasha.length)]
    else
      @next_scan = untagged[rand(untagged.length)]
    end
  end

end
