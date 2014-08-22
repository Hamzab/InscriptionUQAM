
function getJson(callback,sigle,programme){
var http = require("http");
var querystring = require('querystring');
var postData = querystring.stringify({
      sigle: sigle,
      code_prog: programme,
      an_ses2: "Automne 2013",
      Iframe: 0
    });

var options = {
    host: 'www.websysinfo.uqam.ca',
    port: 80,
    path: '/regis/rwe_horaire_cours/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
};
  var resultat;
  var request = http.request(options, function(res) {
   if (res.statusCode !== 200) {
      callback("HTTP Error: " + res.statusCode);
   }else{
    var chunks = [];
    res.setEncoding("utf8");


	res.on("data", function(chunk) {
      chunks.push(chunk);
    });
   
    res.on("end", function() {
	  var html;
	  for(var i=0;i<chunks.length;i++){
	    html+=chunks[i];
	  }
	  var Parser = require ('./UqamResponseParser');
	  var param;
	  var rep;
	  Parser.parse(html,function(param,rep){
	    resultat=rep;   
	   
	   });  	
       callback(null,resultat);		 
    });  
	}
  
  });
  request.on("error", function (e) {
    callback(e);
  });
  request.write(postData);
  request.end();
  
  }
  
  exports.getJson = getJson;