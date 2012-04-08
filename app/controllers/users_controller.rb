class UsersController < ApplicationController

  def index

  end

  def new
    @user = User.new
    @heading = t(:new_user)
  end

  def show
    @user = User.find(params[:id])
  end

  def create
  end
end
