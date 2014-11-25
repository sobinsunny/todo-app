require 'will_paginate'
class TasksController < ApplicationController
before_filter :check_id

def create
@tasks=Task.all
@task = Task.new(params[:task])
@task[:task_order]=@tasks.size
@task[:status]=0;
@task[:users_id]=session[:user_id]

puts @task[:id]

  if @task.save
    @u_id=session[:user_id]
    @tasks=Task.paginate(:page=>params[1],:per_page=>5,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
    render :partial => "taskcontent"
  else
     flash[:notice] = @task.errors
     redirect_to :controller=>'tasks',:action=>"index"
  end

end

  def index
    @u_id=session[:user_id]
    @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
  end

  def destroy
    @u_id=session[:user_id]
    @d_id=params[:id]
    Task.destroy(@d_id)
    @tasks=Task.all
    @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
    puts "run"
    render :partial => "taskcontent"

  end

  def new
    @user=User.first
    @task = Task.new
  end
def changeorder_down
  @u_id=session[:user_id]
  current_task_id=params[:task][:task_id].to_i
  current_task_row=Task.find(current_task_id)
  current_task_order=current_task_row.task_order
  next_task=Task.find(:first,:conditions =>"id < #{current_task_id}")
  next_task_order=next_task.task_order
  next_task_id=next_task.id
  Task.find(current_task_id).update_attributes(:task_order=>next_task_order)
  Task.find(next_task_id).update_attributes(:task_order=>current_task_order)
  @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
  render :partial => "taskcontent"
end
def changeorder_up
  @u_id=session[:user_id]
  current_task_id=params[:task][:task_id].to_i
  current_task_row=Task.find(current_task_id)
  current_task_order=current_task_row.task_order
  next_task=Task.find(:last,:conditions =>"id > #{current_task_id}")
  next_task_order=next_task.task_order
  next_task_id=next_task.id
  Task.find(current_task_id).update_attributes(:task_order=>next_task_order)
  Task.find(next_task_id).update_attributes(:task_order=>current_task_order)
  @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
  render :partial => "taskcontent"
end

  def update
        @u_id=session[:user_id]
        t=Task.find(params[:id])
        if t.status==0
           Task.find(params[:id]).update_attributes(:status=>1)
        else
           Task.find(params[:id]).update_attributes(:status=>0)
        end
        @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
        render :partial => "taskcontent"
  end
# def scroll
#       @count_value=6
#       @u_id=session[:user_id]
#       @count_value=@count_value+1
#       @tasks=Task.find(:all,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC",:limit=>@count_value)
#       render :partial => "taskcontent"
# end
private

def check_id
  if session[:user_id].nil?
    redirect_to :controller=>'users',:action=>"login"
  else
    @user=User.find(session[:user_id])
  end
return true
end


end
