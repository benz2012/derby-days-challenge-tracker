// Scraping Helper Fuctions
exports.parseMembers = function(html) {
  var re = /"membersrecruited":\s"(\d+)"/;
  var num = parseInt(parseHTML(html, re))
  return num
}

exports.parseRaised = function(html) {
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
