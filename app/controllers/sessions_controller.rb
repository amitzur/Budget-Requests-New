class SessionsController < ApplicationController

  def new
    @title = t(:sign_in)
    @heading = t(:sign_in)
  end

  def create
    user = User.find_by_email(params[:session][:email])
    if user.nil?
        user = User.new(:email => params[:session][:email], :name => params[:session][:name])
        if user.save
          sign_in user
          redirect_to user
        else
          # error in creating new user
        end
    else
      puts "!!!!!!!!"
      sign_in user
      redirect_to user
    end
  end
end
