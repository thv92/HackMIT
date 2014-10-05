import jinja2
import os
import webapp2
from google.appengine.ext import ndb

jinja_environment = jinja2.Environment(loader=
    jinja2.FileSystemLoader(os.path.dirname(__file__)))

#ndb.Model writes __init__ function for us
#so we don't have to explicitly define it
class WallPost(ndb.Model):
    sender = ndb.StringProperty(required=True)
    message = ndb.TextProperty(required=True)
    mood = ndb.StringProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now_add=True)
    
class MainHandler(webapp2.RequestHandler):
    def get(self):
        wall_posts = WallPost.query().order(-WallPost.timestamp).fetch(100)
        template_values = {}
        template_values['wall_posts'] = wall_posts
        template = jinja_environment.get_template('wall.html')
        self.response.write(template.render(template_values))
    
    def post(self):
        #1. Read the request
        sender = self.request.get('sender')
        message = self.request.get('message')
        mood = self.request.get('mood')
        #2. Process the request (logic and database)
        new_wall_post = WallPost(sender=sender, message=message, mood=mood)
        new_wall_post.put() #puts object into database
        
        wall_posts = WallPost.query().order(-WallPost.timestamp).fetch(100)
        
        if new_wall_post not in wall_posts:
            wall_posts.insert(0, new_wall_post)
            
        #3. Render the request
        template_values = {}
        template_values['wall_posts'] = wall_posts
        template = jinja_environment.get_template('wall.html')
        self.response.write(template.render(template_values))

class DeleteHandler(webapp2.RequestHandler):
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
        self.redirect('/')
        '''
        template_values = {}
        template_values['wall_posts'] = wall_posts
        template = jinja_environment.get_template('wall.html')
        self.response.write(template.render(template_values))
        '''
    
routes = [
         ('/', MainHandler),
         ('/delete', DeleteHandler)
         ]
         
app = webapp2.WSGIApplication(routes, debug=True)