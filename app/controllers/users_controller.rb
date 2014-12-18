
require 'bcrypt'


class UsersController < ApplicationController

  layout false, :except => 'changepassword'

  def login
    @user=User.new
    if request.post?
      uname=params["user"]["email"]
      paswd=params["user"]["password"]
      @u=User.find_by_email(uname)
      if @u.present?
        if ((BCrypt::Password.new(@u.password).is_password? paswd) and (@u.check==1))
          flash[:notice_login] = 'You successfully Signed.'
          session[:user_id]=@u.id
          redirect_to :controller => "tasks", :action => "index"
        else
          flash[:notice_login] = 'Password for this username is incorrect !'
        end
      else
        flash[:notice_login] = 'This User name and password is not exists !'
      end
    end
  end

  def edit

  end

  def update

  end

  def changepassword
    @user=User.find(session[:user_id])
    if request.post?
      if @user.update_attributes(params[:user])
        session.delete(:user_id)
        redirect_to login_users_path
         flash[:notice_login] =  "Password is succesfully Changed"
      else
       flash[:notice_login] =  @user.errors.full_messages
    end
    end
  end

  def create
    @user=User.new(params[:user])
    @user[:check]=(1900 + rand(81)).to_s
    paswd=params["user"]["password"]
    if @user.save
      UserMailer.deliver_welcome_email(@user)
      flash[:notice_login] = 'Registration  completed !'
      sleep(2)
      flash[:notice_login] = 'Verification mail was send to your email already !'
      redirect_to login_users_path
    else
      render :new
    end
  end

  def new
    @user=User.new
  end

  def logout
    session.delete(:user_id)
    flash[:notice_login] = 'You Succesfully signed out !'
    redirect_to login_users_path
  end

  def emailcheck
      @email_user_id=params[:user_id].to_i
      @email_check_id=params[:check].to_i
      @user=User.find(@email_user_id)
      if @email_check_id==@user.check
          if @user.update_attributes(:check=>1)
            redirect_to :controller => "users", :action => "login"
          else

          end
      else

      end
  end
end
