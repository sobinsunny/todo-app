class CreateTasks < ActiveRecord::Migration
  def self.up
    create_table :tasks do |t|
      t.text :task
      t.integer :status
      t.references :users
      t.task_progress :integer ,:default => 0
      t.timestamps
    end

	
  end

  def self.down
    drop_table :tasks
  end
end
