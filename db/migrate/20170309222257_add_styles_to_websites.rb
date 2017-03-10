class AddStylesToWebsites < ActiveRecord::Migration
  def change
    add_column :websites, :background_colour, :string, default: "dddddd"
    add_column :websites, :foreground_colour, :string, default: "ffffff"

  end
end
