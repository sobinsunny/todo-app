class Task < ActiveRecord::Base
  belongs_to :user
  has_many:comments, :dependent => :destroy
  validates_length_of :task, :minimum => 1, :allow_blank => false
  has_many:tags, :dependent => :destroy
  after_create :create_tag

  private
       def create_tag
         @tag=Tag.new()
         @tag.task_id=id
         @task=Task.find(id)
         @id=@task.user_id
         @tag.user_id=@id
         @tag.task_order=id
         @tag.save
       end
end
