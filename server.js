var express = require('express');
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

// GOOGLE SHEETS
var google = require('googleapis');

// Google Sheets Authentication/Variables
var sheets = google.sheets({version: 'v4'});
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  process.env.CLIENT_ID_1,
  process.env.CLIENT_SECRET_1,
  'https://derby-days.herokuapp.com/'
);
oauth2Client.setCredentials({
  access_token: process.env.ACCESS_TOKEN_1,
  refresh_token: process.env.REFRESH_TOKEN_1
});

// Google Sheets API Call
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

// Listen
app.listen(process.env.PORT || 8080);
