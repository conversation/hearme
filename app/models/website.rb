class Website < ActiveRecord::Base
  validates :name, presence: true
  validates :url, presence: true

  has_many :articles
end
