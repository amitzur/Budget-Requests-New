class PniyasController < ApplicationController
  # GET /pniyas
  # GET /pniyas.json
  def index
    @pniyas = Pniya.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @pniyas }
    end
  end

  # GET /pniyas/1
  # GET /pniyas/1.json
  def show
    @pniya = Pniya.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @pniya }
    end
  end

  # GET /pniyas/new
  # GET /pniyas/new.json
  def new
    @pniya = Pniya.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @pniya }
    end
  end

  # GET /pniyas/1/edit
  def edit
    @pniya = Pniya.find(params[:id])
  end

  # POST /pniyas
  # POST /pniyas.json
  def create
    @pniya = Pniya.new(params[:pniya])

    respond_to do |format|
      if @pniya.save
        format.html { redirect_to @pniya, notice: 'Pniya was successfully created.' }
        format.json { render json: @pniya, status: :created, location: @pniya }
      else
        format.html { render action: "new" }
        format.json { render json: @pniya.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /pniyas/1
  # PUT /pniyas/1.json
  def update
    @pniya = Pniya.find(params[:id])

    respond_to do |format|
      if @pniya.update_attributes(params[:pniya])
        format.html { redirect_to @pniya, notice: 'Pniya was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @pniya.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pniyas/1
  # DELETE /pniyas/1.json
  def destroy
    @pniya = Pniya.find(params[:id])
    @pniya.destroy

    respond_to do |format|
      format.html { redirect_to pniyas_url }
      format.json { head :no_content }
    end
  end
end
