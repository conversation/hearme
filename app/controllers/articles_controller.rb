class ArticlesController < ApplicationController
  before_action :find_website
  before_action :find_article, only: [:show, :edit, :update, :destroy]

  def index
    @websites = Article.all
  end

  def show
  end

  def new
    @website = Article.new
  end

  def edit
  end

  def create
    @website = Article.create(website_params)
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
    @website = Website.find(params[:website_id])
  end

  def find_article
    @article = @website.articles.where(id: params[:id]).first
  end

  def website_params
    params.require(:website).permit(:name, :url, :body)
  end
end
