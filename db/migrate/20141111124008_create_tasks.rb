class CreateTasks < ActiveRecord::Migration
  def self.up
    create_table :tasks do |t|
      t.text :task
      t.integer :task_order,:auto_increment => true
      t.integer :status
      t.references :users
      t.timestamps
    end

	
  end

  def self.down
    drop_table :tasks
  end
end
