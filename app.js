var express = require('express')
  , routes = require('./routes')
  , path = require('path');
var http = require('http');
var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/xml', routes.xml);
app.get('/json', routes.json);
var info = require("./service-info.js");

app.get('/info/:programme/:sigle/:groupe', function(req,res){

var sigle = req.params.sigle;
var programme = req.params.programme;
var groupe = req.params.groupe;

 info.getJson(function (err, json) {
    if (err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write("Server error: " + err);
      res.end();
    } else {
       res.writeHead(200, {'Content-Type': 'application/json ; charset="utf-8"'});
	  var pos=getPosition(json,groupe);
	  
	  
	  if(pos!=-1){  
      res.write(JSON.stringify(json[pos]));
	  }else{	 
	  res.write(JSON.stringify(json));
	  }

      res.end();
    }
	
	},sigle ,programme);
});	

var inscription = require("./service-inscription.js");

app.post('/inscription', function(req, res){

 inscription.writeXML(function (err, xml) {
    if (err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write("Server error: " + err);
      res.end();
    } else {
      res.writeHead(200, {"Content-Type": "application/xml"});
      res.write(xml);
      res.end();
    }
	
	},req.body);    
});	
	
app.listen(app.get('port'));

function getPosition(unJson,unElement){
   var pos=-1;
   for(var i=0;i<unJson.length;i++){
      if(unJson[i].groupe==unElement){
	    
	    pos=i;
		
	  }
   }
   return pos;
}
