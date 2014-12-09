class CommentsController < ApplicationController
  def index
    # @user=User.find(params[:user_id])
    # @task=Task.find(params[:task_id])
    # @commnts=@task.comments
  end

  def show
    @comments=Comment.find_all_by_task_id(params[:task_id])
  end

  def new
  end

  def  create
    @comment= Comment.new()
    @comment[:task_id]=params[:task_id]
    @comment[:user_id]=session[:user_id]
    @user=User.find(session[:user_id])
    @comment[:body]=params[:task][:body]
    if @comment.save
      @comments=Comment.find_all_by_task_id(params[:task_id])
      render :partial => "/tasks/commentlist"
    else
      render :action => "new" end
  end

end
