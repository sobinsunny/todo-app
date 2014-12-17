require 'will_paginate'


class TasksController < ApplicationController
before_filter :check_id
@task_progres=[]

def create
    @task = Task.new(params[:task])
    @task[:status]=0;
    @task[:user_id]=session[:user_id]
  if @task.save
    render_tasks()
  else
     flash[:notice] = @task.errors
     redirect_to :controller=>'tasks',:action=>"index"
  end

end

def index
  @u_id=session[:user_id]
  if params[:search] 
      search_keyword=params[:search]
      if params[:status]=='1'
        @tasks =Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and   status=1 and task  LIKE ?",@u_id ,"%#{search_keyword}%"],:order=>"tags.task_order DESC")
      else
        @tasks =Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and   status=0 and task  LIKE ?",@u_id ,"%#{search_keyword}%"],:order=>"tags.task_order DESC")
      end
  else
    if params[:status]=='0'
       @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and status=0",@u_id],:order=>"tags.task_order DESC")
    elsif params[:status]=='1'
       @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and status=1",@u_id],:order=>"tags.task_order DESC")
    else
       @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and status=0",@u_id],:order=>"tags.task_order DESC")    end
    end
end
def destroy
    @u_id=session[:user_id]
    @d_id=params[:id]
    Task.destroy(@d_id)
    render_tasks()
end

def new
    @user=User.first
    @task = Task.new
end

def changeorder_down
  @u_id=session[:user_id]
  current_task_id=params[:task][:task_id].to_i
  current_task_row=Tag.find(:first,:conditions=>{:task_id=>current_task_id,:user_id=>@u_id})
  current_task_order=current_task_row.task_order
  next_task=Tag.find(:last,:conditions=>"task_order < #{current_task_order} and user_id=#{@u_id}")
  next_task_order=next_task.task_order
  next_task_id=next_task.id
  current_task_row.update_attributes(:task_order=>next_task_order)
  next_task.update_attributes(:task_order=>current_task_order)
  render_tasks()
end
def changeorder_up
  @u_id=session[:user_id]
  current_task_id=params[:task][:task_id].to_i
  current_task_row=Tag.find(:first,:conditions=>{:task_id=>current_task_id,:user_id=>@u_id})
  current_task_order=current_task_row.task_order
  next_task=Tag.find(:first,:conditions=>"task_order > #{current_task_order} and user_id=#{@u_id}")
  next_task_order=next_task.task_order
  next_task_id=next_task.id
  current_task_row.update_attributes(:task_order=>next_task_order)
  next_task.update_attributes(:task_order=>current_task_order)
  render_tasks()
end

def update
  @u_id=session[:user_id]
  t=Task.find(params[:id])
  if t.user_id==@u_id
      if t.status==0
         Task.find(params[:id]).update_attributes(:status=>1)
         @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and status=0",@u_id],:order=>"tags.task_order DESC")
         @comment= Comment.new()
         @comment[:task_id]=params[:id]
         @comment[:user_id]=session[:user_id]
         sleep(1)
         @comment[:body]="Status  of the task changed to <span class='c'>Done</span>"
         @comment.save
         render :partial => "taskcontent"
      else
         Task.find(params[:id]).update_attributes(:status=>0)
         @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and status=1",@u_id],:order=>"tags.task_order DESC")
         render :partial => "taskcontent"
      end
  end
end
def show
      @u_id=session[:user_id]
      @user=User.find(params[:user_id])
      @task=Task.find(params[:id])
      @task_id=@task.id;
      @users=User.all
      @assigned_users=Tag.find_all_by_task_id(params[:id]).collect(&:user_id)
      @share_check=Task.find(:all,:conditions=>"id=#{params[:id]}")
      @shares=Tag.find(:all,:conditions=>"task_id=#{params[:id]}")
      @comments=@task.comments
end
def update_task_progess
  @current_task_progres=params[:task][:task_range].to_i
  @u=Task.find(params[:task][:task_id].to_i)
  @previous_task_progres=@u.task_progress
  if @current_task_progres > @previous_task_progres and @u.status==0
    if @u.update_attributes(:task_progress=>@current_task_progres)
      @comment= Comment.new()
      @comment[:task_id]=params[:task][:task_id].to_i
      @comment[:user_id]=session[:user_id]
      @comment[:body]="Task has been update from <span class='c'>#{@previous_task_progres}%</span> to <span class='c'> #{@u.task_progress}%</span> "
        if @comment.save
          @comments=Comment.find_all_by_task_id(params[:task][:task_id].to_i)
          render :partial => "tasks/commentlist"
        end
    end
  else
        @comments=Comment.find_all_by_task_id(params[:task][:task_id].to_i)
        render :partial => "tasks/commentlist"
       
  end
end
def share_task
  @share_user_id=params[:share_names]
  @delete_status=Tag.destroy_all(:task_id => params[:task_id])
  @name_size=@share_user_id.length;

    if @delete_status
      @tag=Tag.new()
      @tag[:user_id]=@u_id
      @tag[:task_id]=params[:task_id]
      @tag[:task_order]=params[:task_id]
      @tag.save
        for i in 0..(@name_size-1)
            @tag=Tag.new()
            @tag[:user_id]=@share_user_id[i]
            @tag[:task_id]=params[:task_id]
            @tag[:task_order]=params[:task_id]
            @tag.save
        end
          @shares=Tag.find(:all,:conditions=>"task_id=#{params[:task_id]}")
          render :partial => "sharenames"
    end
  end




def share_name_display
  @users=User.all
  @assigned_users=Tag.find_all_by_task_id(params[:task][:task_id]).collect(&:user_id)
  if @task_owner_id=@assigned_users
      render :partial => "sharetaskmodal"
  else
      render :partial => "sharetaskmodal"
  end
end






private

def check_id
if session[:user_id].nil?
  redirect_to :controller=>'users',:action=>"login"
else
  @user=User.find(session[:user_id])
  @u_id=session[:user_id]
  @tasks=Task.all.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and status=0",@u_id],:order=>"tags.task_order DESC")
end
return true
end
 def render_tasks
     @u_id=session[:user_id]
     @tasks=Task.paginate(:page=>params[:page],:per_page=>5,:select=>"tasks.*,tags.task_order",:joins=>:tags,:conditions=>["tags.user_id=? and status=0",@u_id],:order=>"tags.task_order DESC")
     render :partial => "taskcontent"
 end
end
