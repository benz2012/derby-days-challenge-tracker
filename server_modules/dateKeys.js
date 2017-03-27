exports.challengeOne = function() {
  var today = new Date();
  var start = new Date('2017-03-20');
  var end = new Date('2017-04-23');
  var dateKeys = null;
  if (today.getTime() <= start.getTime()) {
    activeKeys = ['2017-03-20'];
  } else if (today.getTime() > end.getTime()) {
    activeKeys = null;
  } else {
    activeKeys = []
    var key = todayKey();
    var i = 0;
    while (new Date(key).getTime() < end.getTime()) {
      activeKeys.push(key);
      i++;
      var nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      key = structureKey(nextDate);
    }
  }
  return activeKeys;
};

// helper functions
var todayKey = exports.todayKey = function() {
  var today = new Date();
  var key = structureKey(today);
  return key;
}
function structureKey(date) {
  var key = date.getFullYear() + '-' +
    padDate(date.getMonth() + 1) + '-' +
    padDate(date.getDate());
  return key
}
function padDate(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}
