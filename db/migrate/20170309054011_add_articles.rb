class AddArticles < ActiveRecord::Migration
  def change
    create_table :articles, id: :uuid  do |t|
      t.string :url, null: false
      t.belongs_to :website, index: true
    end
  end
end
