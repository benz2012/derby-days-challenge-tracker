var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');
var firebase = require(__dirname + '/server_modules/firebase_connection.js');
var parser = require(__dirname + '/server_modules/parser.js');
var dateKeys = require(__dirname + '/server_modules/dateKeys.js');

// Declare static path for app
app.use(express.static(__dirname + '/'));

// Load Initial Data from Google Firebase Database
var teams, members, raised, membersPrev, raisedPrev;
firebase.getFireData("teams", function(data) {
  teams = data;
});
firebase.getFireData("members", function(data) {
  members = data;
  membersPrev = deepCopy(members); // initial previous copy
});
firebase.getFireData("raised", function(data) {
  raised = data;
  raisedPrev = deepCopy(raised); // initial previous copy
});

// Socket IO Connection to Clients
var clients = {};
var server_version = "0104";
io.on('connection', function(socket) {
  io.emit('version', server_version);
  clients[socket.id] = true;
  io.emit('number_watching', Object.keys(clients).length);


  socket.on('ready', function() {
    dataForClient(function(data) {
      socket.emit('update_data', data);
    });
  });

  socket.on('disconnect', function() {
    delete clients[socket.id];
    io.emit('number_watching', Object.keys(clients).length);
  });
});

// Scrape Data from Derby Challenge
setInterval(function() {
  if (teams == null) { return }
  Object.keys(teams).forEach(function(teamKey) {
    var url = teams[teamKey]['team_page_url'];
    if (url == "") { return } // skip if no url specified for team
    request(url, function(err, res, rawHtml) {
      if (err) {
        console.log('Error scraping url', err);
      } else {
        var html = rawHtml.toString()

        var membersFound = parser.parseMembers(html);
        var activeDates = dateKeys.challengeOne();
        if (activeDates != null) {
          activeDates.forEach(function(date) {
            members[teamKey][date] = membersFound
          });
        }

        var raisedFound = parser.parseRaised(html);
        var todayKey = dateKeys.todayKey();
        raised[teamKey][todayKey] = raisedFound;
      }
    });
  });
}, 1000); // run every second

// Check if data has changed
//   update the connected clients & update Firebase
setInterval(function() {
  var toUpdate = {}
  if (teams == null) { return }
  if (members == null) { return }
  Object.keys(teams).forEach(function(teamKey) {
    Object.keys(members[teamKey]).forEach(function(attr) {
      if (membersPrev[teamKey][attr] != members[teamKey][attr]) {
        // members have changed in the last second
        if (Object.keys(clients).length > 0) {
          dataForClient(function(data) {
            io.emit('update_data', data);
          });
        }
        toUpdate['members/' + teamKey + '/' + attr] = members[teamKey][attr]
      }
      membersPrev[teamKey][attr] = members[teamKey][attr];
    });
    if (raised == null) { return }
    Object.keys(raised[teamKey]).forEach(function(attr) {
      if (raisedPrev[teamKey][attr] != raised[teamKey][attr]) {
        // raised has changed in the last second
        if (Object.keys(clients).length > 0) {
          dataForClient(function(data) {
            io.emit('update_data', data);
          });
        }
        toUpdate['raised/' + teamKey + '/' + attr] = raised[teamKey][attr]
      }
      raisedPrev[teamKey][attr] = raised[teamKey][attr];
    });
  });
  firebase.updateFireData('/', toUpdate);
}, 1000); // run every second

// Helper Functions
function deepCopy(original) {
  var copy = {};
  if (original == null) { return copy; }
  Object.keys(original).forEach(function(teamKey) {
    copy[teamKey] = {};
    Object.keys(original[teamKey]).forEach(function(attr) {
      copy[teamKey][attr] = original[teamKey][attr]
    });
  });
  return copy;
}
function dataForClient(callback) {
  // Can be used to pre-process the data before it is sent to the client
  var data = {};
  data['teams'] = teams;
  data['members'] = members;
  data['raised'] = raised;
  callback(data);
}

server.listen(process.env.PORT || 8080, function() {
  console.log('listening on port ' + this.address().port);
});
