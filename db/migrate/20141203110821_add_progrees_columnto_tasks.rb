class AddProgreesColumntoTasks < ActiveRecord::Migration
  def self.up
    add_column :tasks, :task_progress, :integer ,:default => 0
  end

  def self.down
  end
end