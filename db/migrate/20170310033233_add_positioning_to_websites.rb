class AddPositioningToWebsites < ActiveRecord::Migration
  def change
    add_column :websites, :position, :string, default: "right"
    add_column :websites, :offset, :string, default: "50px"
  end
end
