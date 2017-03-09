class WebsitesController < ApplicationController
  before_action :find_website, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, only: [:find]

  def find
    @website = Website.where(url: params[:url])

    if @website.any?
      @website = Website.where(url: params[:url]).first
    else
      @website = Website.create!(name: params[:url], url: params[:url])
    end

    @article = @website.articles.find_or_create_by(url: params[:href])

    respond_to do |format|
      format.json { render json: @article }
    end
  end

  def index
    @websites = Website.all
  end

  def show
  end

  def new
    @website = Website.new
  end

  def edit
  end

  def create
    @website = Website.create(website_params)
    redirect_to website_path(@website)
  end

  def update
    @website.update_attributes(website_params)
    redirect_to website_path(@website)
  end

  def destroy
    @website.destroy
    redirect_to websites_path
  end

  private

  def find_website
    @website = Website.find(params[:id])
  end

  def website_params
    params.require(:website).permit(:name, :url)
  end
end
