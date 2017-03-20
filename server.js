var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

// Declare path for app
app.use(express.static(__dirname + '/'));

// Micro API Handlers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/sheets', function(req, res) {
  getSheetData(function(data) {
    res.json(JSON.stringify(data));
    res.end();
  });
});

// Scrape Data & Write it to Speadsheet
setInterval(function() {
  getURLs(function(urls, row){
    var cols = Object.keys(urls);
    cols.forEach(function(col) {
      if (col == 0) return;
      var url = urls[col]
      request(url, function(error, response, html) {
        if (error) {
          console.log('Error scraping url', error)
        } else {
          var re = /"membersrecruited":\s"(\d+)"/;
          var match = re.exec(html.toString());
          if (match.length > 0) {
            var numMembers = match[1];
            var charCode = 65 + parseInt(col); // ASCII 65 == 'A'
            var columnString = String.fromCharCode(charCode);
            var rowString = row.toString();
            var cell = columnString + rowString;
            setNumber(cell, numMembers)
          }
        }
      });
    });
  });
}, 100000);

// GOOGLE SHEETS AUTH
var google = require('googleapis');
var sheets = google.sheets({version: 'v4'});
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

// Google Sheets API Calls
function getSheetData(callback) {
  sheets.spreadsheets.values.get({
    auth: oauth2Client,
    spreadsheetId: '1N7Elo6rsgQsj0ptaSxjD-VvNnwPKhWfZk6CyU2rF-fk',
    range: 'TeamData!A:G',
  }, function(err, response) {
    var payload = {}
    if (err) {
      payload = {status: 'ERROR', payload: err};
    }
    var rows = response.values;
    if (rows.length == 0) {
      payload = {status: 'FAILED', payload: {}};
    } else {
      var dataMatrix = {};
      for (i = 0; i < rows.length; i++) {
        row = rows[i];
        dataMatrix[i] = row;
      }
      payload = {status: 'SUCCESS', payload: dataMatrix};
    }
    callback(payload)
  });
}

function getURLs(callback) {
  sheets.spreadsheets.values.get({
    auth: oauth2Client,
    spreadsheetId: '1N7Elo6rsgQsj0ptaSxjD-VvNnwPKhWfZk6CyU2rF-fk',
    range: 'TeamData!A:G',
  }, function(err, response) {
    if (err) {
      console.log('Error geting google sheet: ', err);
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('Error: No rows were found in google sheet');
    } else {
      var todayRowKey = computeRowKey();
      console.log(todayRowKey);
      var urls = {};
      var todayRow;
      for (i = 0; i < rows.length; i++) {
        var row = rows[i];
        var header = row[0];
        if (header == 'Team Page URL'){
          for (col = 0; col < row.length; col++){
            urls[col] = row[col];
          }
        } else if (header == todayRowKey) {
          todayRow = i + 1;
        }
      }
      callback(urls, todayRow)
    }
  });
}

function computeRowKey() {
  var today = new Date();
  var start = new Date('2017/03/20');
  var end = new Date('2017/04/22');
  var key = '';
  if (today.getTime() < start.getTime()) {
    key = '2017/03/20';
  } else if (today.getTime() > end.getTime()) {
    key = '2017/04/22';
  } else {
    key = today.getFullYear() + '/' + padDate(today.getMonth() + 1) + '/' + padDate(today.getDate());
  }
  return key;
};

function padDate(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}

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

// Listen
app.listen(process.env.PORT || 8080);
