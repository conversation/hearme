class Article < ActiveRecord::Base
  validates :url, presence: true

  has_one :website
  has_many :actions, dependent: :destroy
end
