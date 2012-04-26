class BakashasController < ApplicationController

  before_filter :authenticate_user!, :only => [:new, :create, :edit, :update, :destroy]

  # GET /bakashas
  # GET /bakashas.json
  def index
    @bakashas = Bakasha.all
    @heading = t(:reshimat)
    @subheading = t(:all_you_filled)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @bakashas }
    end
  end

  # GET /bakashas/1
  # GET /bakashas/1.json
  def show
    @bakasha = Bakasha.find(params[:id])
    scan = Scan.find_by_id(@bakasha.scan_id)
    unless scan.nil?
      @file = 'https://s3-eu-west-1.amazonaws.com/hasadna-budget-requests/' + scan[:filename].gsub(" ", "+")
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @bakasha }
    end
  end

  # GET /bakashas/new
  # GET /bakashas/new.json
  def new
    @bakasha = Bakasha.new
    unless params[:sid].nil?
      scan = Scan.find_by_id(params[:sid])
      if scan.nil?
        redirect_to :bakashas and return
      end
      @file = 'https://s3-eu-west-1.amazonaws.com/hasadna-budget-requests/' + scan[:filename].gsub(" ", "+")
      @sid = params[:sid]
    else
      redirect_to :bakashas and return
    end
    @heading = t(:if_you_came)
    @subheading = t(:it_would_be_nice)

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @bakasha }
    end
  end

  # GET /bakashas/1/edit
  def edit
    @bakasha = Bakasha.find(params[:id])
  end

  # POST /bakashas
  # POST /bakashas.json
  def create
    @bakasha = current_user.bakashas.new(params[:bakasha])

    respond_to do |format|
      if @bakasha.save
        format.html { redirect_to @bakasha, :notice => true }
        format.json { render json: @bakasha, status: :created, location: @bakasha }
      else
        format.html { render action: "new" }
        format.json { render json: @bakasha.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /bakashas/1
  # PUT /bakashas/1.json
  def update
    @bakasha = Bakasha.find(params[:id])

    respond_to do |format|
      if @bakasha.update_attributes(params[:bakasha])
        format.html { redirect_to @bakasha, notice: 'Bakasha was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @bakasha.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bakashas/1
  # DELETE /bakashas/1.json
  def destroy
    @bakasha = Bakasha.find(params[:id])
    @bakasha.destroy

    respond_to do |format|
      format.html { redirect_to bakashas_url }
      format.json { head :no_content }
    end
  end
end
