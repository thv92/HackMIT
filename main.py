#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import jinja2
import os
import webapp2
import time
import re
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import oauth

jinja_environment = jinja2.Environment(loader=
    jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        login_url = users.create_login_url('/html/Register.html')
        
        template_values['login_url'] = login_url

        template = jinja_environment.get_template('/html/splash.html')

        self.response.write(template.render(template_values))

class StudentHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/userStudentMain.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()

        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url

        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        self.response.write(template.render(template_values))

class MentorHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/userMentorMain.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        self.response.write(template.render(template_values))

class MCheckHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/mentorCheck_In.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        self.response.write(template.render(template_values))

class MDocHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/mentorDocuments.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        self.response.write(template.render(template_values))

class MMessageHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/mentorMessages.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        wall_posts = WallPost.query().order(-WallPost.timestamp).fetch(100)
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        template_values['wall_posts'] = wall_posts
        self.response.write(template.render(template_values))
    def post(self):
        #1. Read the request
        sender = self.request.get('sender')
        message = self.request.get('message')
        subject = self.request.get('subject')
        #2. Process the request (logic and database)
        new_wall_post = WallPost(sender=sender, message=message, subject=subject)
        new_wall_post.put() #puts object into database
        
        wall_posts = WallPost.query().order(-WallPost.timestamp).fetch(100)
        
        if new_wall_post not in wall_posts:
            wall_posts.insert(0, new_wall_post)
            
        #3. Render the request
        template_values = {}
        template_values['wall_posts'] = wall_posts
        template = jinja_environment.get_template('/html/mentorMessages.html')
        self.response.write(template.render(template_values))

class MRosterHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/mentorRoster.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        self.response.write(template.render(template_values))

class SCheckHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/studentCheck_In.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        self.response.write(template.render(template_values))

class SDocHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/studentDocuments.html')

        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        self.response.write(template.render(template_values))

class SMessageHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('/html/studentMessages.html')

        wall_posts = WallPost.query().order(-WallPost.timestamp).fetch(100)
        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()[0]
        rs = curUser.spaces.get()
        space_name = rs.space_name
        space_key = rs.key.id()
        template_values['space_name'] = space_name
        template_values['space_key'] = space_key
        logout_url = users.create_logout_url('/')
        template_values ['logout_url']=logout_url
        template_values['wall_posts'] = wall_posts
        self.response.write(template.render(template_values))
    def post(self):
        #1. Read the request
        sender = self.request.get('sender')
        message = self.request.get('message')
        subject = self.request.get('subject')
        #2. Process the request (logic and database)
        new_wall_post = WallPost(sender=sender, message=message, subject=subject)
        new_wall_post.put() #puts object into database
        
        wall_posts = WallPost.query().order(-WallPost.timestamp).fetch(100)
        
        if new_wall_post not in wall_posts:
            wall_posts.insert(0, new_wall_post)
            
        #3. Render the request
        template_values = {}
        template_values['wall_posts'] = wall_posts
        template = jinja_environment.get_template('/html/studentMessages.html')
        self.response.write(template.render(template_values))

#when this gets called, go to /html/Register.html
class LoginHandler(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        login_url = users.create_login_url('/login')
        
        template_values['login_url'] = login_url
        
        template = jinja_environment.get_template('/html/Register.html')
        self.response.write(template.render(template_values))

class ErrorHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        template = jinja_environment.get_template('error.html')
        self.response.write(template.render(template_values))
#TODO: find a way to get feedback on new user page about errors (username vs. key)   
#check if the username is a new user or not
#if yes, go to create a new user page
#if not, go to the homepage
class NewUserHandler(webapp2.RequestHandler):
    def get(self):
        template_values={}
        curUser = UserName.query(UserName.useremail==users.get_current_user().email()).fetch()
        if len(curUser)>0:
            if(curUser[0].status=="mentor"):
                return self.redirect('/html/userMentorMain.html')
            else:
                return self.redirect('/html/userStudentMain.html')
        template = jinja_environment.get_template('/html/Register.html')
        self.response.write(template.render(template_values))
    def post(self):
        username=self.request.get('username')
        status = self.request.get('smmenu')
        existing_key=self.request.get('existing_key')
        new_name=self.request.get('new_name')
        #if key in db:
        #space_name = space_name in db
        #if not:
        #self.redirect('/html/Register.html')
        if len(UserName.query(UserName.username==username).fetch())>0 or (username=='') or ("<" in username) or (">" in username) or ("{" in username) or ("}" in username) or len(str(username)) > 20:
            return self.redirect('/html/Register.html')
        else:
            all_spaces = {}
            add_space = None

            if new_name and not(existing_key):
                add_space = ResearchSpace(space_name=new_name)
                add_space.put()
                all_spaces = ResearchSpace.query(ResearchSpace.space_name==new_name).fetch()
                if len(all_spaces) == 0:
                    all_spaces.insert(0, add_space)
            elif existing_key and not(new_name):
                spaces = ResearchSpace.query().fetch()
                for rs in spaces:
                    if existing_key == str(rs.key.id()):
                        add_space = rs
                if not add_space:
                    return self.redirect('/html/Register.html')
            else:
                return self.redirect('/html/Register.html')

            #rs = all_spaces[0]
            newusername=UserName(username=username, useremail=users.get_current_user().email(), status=status, spaces=add_space.key)
            key=newusername.put()
            key.get(use_cache=False)

            if(status=="mentor"):
                return self.redirect('/html/userMentorMain.html')
            else:
                return self.redirect('/html/userStudentMain.html')

class MDeleteHandler(webapp2.RequestHandler):
    def post(self):
        #1. Read the request
        urlsafe = self.request.get('key')
        
        #2. Process the request (logic and database)
        wall_post_key = ndb.Key(urlsafe=urlsafe)
        wall_post = wall_post_key.get()
        sender = wall_post.sender
        
        wall_post_key.delete()
        #3. Render the request
        #self.response.write('Deleted %s\'s post' % sender)
        self.redirect('/html/mentorMessages.html')

class SDeleteHandler(webapp2.RequestHandler):
    def post(self):
        #1. Read the request
        urlsafe = self.request.get('key')
        
        #2. Process the request (logic and database)
        wall_post_key = ndb.Key(urlsafe=urlsafe)
        wall_post = wall_post_key.get()
        sender = wall_post.sender
        
        wall_post_key.delete()
        #3. Render the request
        #self.response.write('Deleted %s\'s post' % sender)
        self.redirect('/html/studentMessages.html')

#a Username database model that contains the user's username and email
class UserName(ndb.Model):
        username=ndb.StringProperty()
        useremail=ndb.StringProperty()
        status=ndb.StringProperty()
        spaces=ndb.KeyProperty()

#a ResearchSpace database model that contains the space key and name
class ResearchSpace(ndb.Model):
        #space_key=ndb.KeyProperty()
        #space_key=ndb.StringProperty()
        space_name=ndb.StringProperty()

class WallPost(ndb.Model):
    sender = ndb.StringProperty(required=True)
    message = ndb.TextProperty(required=True)
    subject = ndb.StringProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now_add=True)

#when the site is at one of these locations, call that handler
#this is order sensitive, so /.* should always go at the end
routes = [
         ('/login', LoginHandler),
         ('/', MainHandler),
         ('/html/userStudentMain.html', StudentHandler),
         ('/html/userMentorMain.html', MentorHandler),
         ('/html/mentorCheck_In.html', MCheckHandler),
         ('/html/mentorDocuments.html', MDocHandler),
         ('/html/mentorMessages.html', MMessageHandler),
         ('/html/mentorRoster.html', MRosterHandler),
         ('/html/studentCheck_In.html', SCheckHandler),
         ('/html/studentDocuments.html', SDocHandler),
         ('/html/studentMessages.html', SMessageHandler),
         ('/html/splash.html', MainHandler),
         ('/html/Register.html', NewUserHandler),
         ('/deleteS', SDeleteHandler),
         ('/deleteM', MDeleteHandler),
         ('/.*', ErrorHandler)
         ]

#a variable creating a web app to handle all these processes
#this is used in app.yaml (main.app means this variable)       
app = webapp2.WSGIApplication(routes, debug=True)

#function for checking user-inputted strings to prevent simple hacking
def checkInput(self, inputString):
    pattern = "^[a-zA-Z]{1,15}$"

    if(not re.match(pattern, inputString)):
        return False
    else:
        return True 
