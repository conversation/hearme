class Action < ActiveRecord::Base
  validates :action_type, presence: true

  has_one :article
end
