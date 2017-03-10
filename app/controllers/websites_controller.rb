class WebsitesController < ApplicationController
  before_action :find_website, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, only: [:find]

  def find
    find_or_create_website
    find_or_create_article

    respond_to do |format|
      format.json { render json: [@website, @article] }
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

  def find_or_create_website
    if Website.where(url: params[:url]).any?
      @website = Website.where(url: params[:url]).first
    else
      @website = Website.create!(name: params[:url], url: params[:url])
    end
  end

  def find_or_create_article
    if Article.where(url: params[:href]).any?
      @article = @website.articles.where(url: params[:href]).first
    else
      @article = @website.articles.create!(url: params[:href], body: params[:body], title: params[:title])
    end
  end

  def website_params
    params.require(:website).permit(:name, :url, :background_colour, :foreground_colour)
  end
end
