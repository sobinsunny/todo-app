class UserMailer < ActionMailer::Base
def welcome_email(user)
  @recipients=user.email
  @from="sobin@foradian.com"
  @subject="Welcome to My Todo Site"
  @sent_on=Time.now
  @body['user'] =user
  @content_type="text/html"
end
end