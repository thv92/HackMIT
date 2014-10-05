var Main = function() {
var http = new XMLHttpRequest();
var url = "http://api.justyo.co/yo/";
var params = "api_token=<token>&username=JOE";
http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Content-length", params.length);
http.setRequestHeader("Connection", "close");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
}
http.send(params);
};

$(document).ready(Main);
$.get('http://yoursite.com/test/' + id, function(data) {
    console.log(data);
});

def search(term, city, latitude, longitude):
    
    url_params = {
        'term': term,
        'location': city,
        'cll': latitude + ',' + longitude,
        'limit': SEARCH_LIMIT,
        'sort': 2, # highest rated
        'radius_filter': 1600 # one mile
    }

    return do_request(API_HOST, SEARCH_PATH, url_params=url_params)

import argparse

@app.route("/yo/")
def yo():

    username = request.args.get('username')
    location = request.args.get('location')
    splitted = location.split(';')
    latitude = splitted[0]
    longitude = splitted[1]

 response = requests.get('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' +longitude + '&zoom=18&addressdetails=1')
    response_object = json.loads(response.text)
    city = response_object['address']['city']

 requests.post("http://api.justyo.co/yo/", data={'api_token': '<your_token>', 'username': username,
 return 'OK'
 if __name__ == "__main__":
    app.debug = True
    app.run()

