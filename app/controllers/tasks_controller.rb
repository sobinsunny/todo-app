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
    @tasks=Task.find(:all,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
    render :partial => "taskcontent"
  else

     flash[:notice] = @task.errors
     redirect_to :controller=>'tasks',:action=>"index"
  end

end

  def index
    @u_id=session[:user_id]

    @tasks=Task.find(:all,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")

  end

  def destroy
    @u_id=session[:user_id]
    @d_id=params[:id]
    Task.destroy(@d_id)
    @tasks=Task.all
    @tasks=Task.find(:all,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
    puts "run"
    render :partial => "taskcontent"

  end

  def new
    @user=User.first
    @task = Task.new
  end
def changeorder_down
    @u_id=session[:user_id]
    task_id=params[:task][:task_id].to_i
    task_id_up=task_id+1
    order_id=params[:order_id].to_i
    order_up_id=order_id-1;
    puts task_id
    puts order_up_id
    Task.find(task_id).update_attributes(:task_order=>order_up_id)
    Task.find(task_id_up).update_attributes(:task_order=>order_id)
    @tasks=Task.find(:all,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
    render :partial => "taskcontent"
end
def changeorder_up
  @u_id=session[:user_id]
  task_id=params[:task][:task_id].to_i
  task_id_up=task_id-1
  order_id=params[:order_id].to_i
  order_up_id=order_id+1;
  puts task_id
  puts order_up_id

  Task.find(task_id).update_attributes(:task_order=>order_up_id)
  Task.find(task_id_up).update_attributes(:task_order=>order_id)
  @tasks=Task.find(:all,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
  render :partial => "taskcontent"
end

  def update
        @u_id=session[:user_id]
        Task.find(params[:id]).update_attributes(:status=>1)
        @tasks=Task.find(:all,:conditions => "users_id=#{@u_id}",:order=>"task_order DESC")
        render :partial => "taskcontent"
  end


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
