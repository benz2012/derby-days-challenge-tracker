var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');
var fs = require('fs');
var dataObj = JSON.parse(fs.readFileSync(__dirname + '/datastore.json', 'utf8'));

// Declare path for app
app.use(express.static(__dirname + '/'));

// Socket IO check for clients and send initial data object
var clients = {};
io.on('connection', function(socket) {
  io.of('/watching').clients(function(err, clie) {
    if (err) throw err;
    console.log(clients);
  });
  clients[socket.id] = true;
  io.emit('number_watching', Object.keys(clients).length);
  // console.log(Object.keys(clients))

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

// Scrape data from Derby Challenge and update dataObj
setInterval(function() {
  var dataChanged = false;
  Object.keys(dataObj).forEach(function(team) {
    var url = dataObj[team]['TeamPageURL'];
    if (url == "") { return } // skip if no url specified for team
    request(url, function(err, res, rawHtml) {
      if (err) {
        console.log('Error scraping url', err);
      } else {
        var html = rawHtml.toString()
        var members = parseMembers(html);
        var activeDates = dateKeys();
        if (activeDates != null) {
          activeDates.forEach(function(key) {
            dataObj[team][key] = members
          });
        }
        var raised = parseRaised(html);
        dataObj[team]['Raised'] = raised;
      }
    });
  });
}, 1000); // run every second

// deep copy the original object
var dataObjPrev = {};
Object.keys(dataObj).forEach(function(team) {
  dataObjPrev[team] = {};
  Object.keys(dataObj[team]).forEach(function(attr) {
    dataObjPrev[team][attr] = dataObj[team][attr]
  });
});
// Check if dataObj has changed and update the connected clients
setInterval(function() {
  if (Object.keys(clients).length > 0) {
    Object.keys(dataObj).forEach(function(team) {
      Object.keys(dataObj[team]).forEach(function(attr) {
        if (dataObjPrev[team][attr] != dataObj[team][attr]) {
          // data has changed in the last second
          dataForClient(function(data) {
            io.emit('update_data', data);
          });
        }
        dataObjPrev[team][attr] = dataObj[team][attr]
      });
    });
  }
}, 1000); // run every second

function dataForClient(callback) {
  // Can be used to pre-process the data before it is sent to the client
  callback(dataObj);
}

// Scraping Helper Fuctions
function parseMembers(html) {
  var re = /"membersrecruited":\s"(\d+)"/;
  var num = parseInt(parseHTML(html, re))
  return num
}

function parseRaised(html) {
  var re = /"raised":\s"([\d\.]+)"\,\s+"image1"/;
  var num = parseFloat(parseHTML(html, re))
  return num
}

function parseHTML(html, re) {
  var desired = null;
  var match = re.exec(html);
  if (match) {
    if (match.length > 0) {
      desired = match[1];
    }
  } else {
    console.log('Could not find desired expression in html');
  }
  return desired
}

// Challenge 1 Helper Functions
function dateKeys() {
  var today = new Date();
  var start = new Date('2017/03/20');
  var end = new Date('2017/04/23');
  var dateKeys = null;
  if (today.getTime() <= start.getTime()) {
    activeKeys = ['2017/03/20'];
  } else if (today.getTime() > end.getTime()) {
    activeKeys = null;
  } else {
    activeKeys = []
    var key = today.getFullYear() + '/' + padDate(today.getMonth() + 1) + '/' + padDate(today.getDate());
    var i = 0;
    while (new Date(key).getTime() < end.getTime()) {
      activeKeys.push(key);
      i++;
      var nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      key = nextDate.getFullYear() + '/' + padDate(nextDate.getMonth() + 1) + '/' + padDate(nextDate.getDate());
    }
  }
  return activeKeys;
};

function padDate(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}

// GOOGLE SHEETS AUTH
var google = require('googleapis');
var sheets = google.sheets({version: 'v4'});
if (process.env.NODE_ENV !== "production") {
  require('./env.js')
};
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  process.env.CLIENT_ID_1,
  process.env.CLIENT_SECRET_1,
  'https://derby-days.herokuapp.com/'
);
oauth2Client.setCredentials({
  access_token: process.env.ACCESS_TOKEN_2,
  refresh_token: process.env.REFRESH_TOKEN_2
});

// Write backup data to Speadsheet every 3 hours
setInterval(function() {
  console.log('attempting to write backup data...');
  Object.keys(dataObj).forEach(function(team) {
    var activeDates = dateKeys();
    if (activeDates != null) {
      var rowKey = activeDates[0];
      var numMembers = dataObj[team][rowKey];
      var rowDate = new Date(rowKey);
      var row = 0;
      if ((rowDate.getMonth() + 1) == 3) { //march
        row = rowDate.getDate() - 17;
      } else if ((rowDate.getMonth() + 1) == 4) { // april
        row = rowDate.getDate() + 14;
      } else {
        return; // if somethings wrong, don't overwite in a bad row
      }
      var charCode = 65 + parseInt(team);
      var columnString = String.fromCharCode(charCode);
      var rowString = row.toString();
      var cell = columnString + rowString;
      setNumber(cell, numMembers);
    } else {
      return;
    }
  });
  console.log('wrote backup data to google spreadsheet');
}, 10800000); // ever 3 hours in miliseconds

function setNumber(cell, number) {
  var request = {
    spreadsheetId: '1N7Elo6rsgQsj0ptaSxjD-VvNnwPKhWfZk6CyU2rF-fk',
    range: 'TeamData!' + cell,
    valueInputOption: 'USER_ENTERED',
    resource: {
      "values": [[number]]
    },
    auth: oauth2Client
  };
  sheets.spreadsheets.values.update(request, function(err, response) {
    if (err) {
      console.log('Error putting number in google sheet', err);
    }
    return;
  });
};

server.listen(process.env.PORT || 8080);
