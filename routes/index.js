
/*
 * GET home page.
 */

var data = {data:[{sigle:"INF2005", titre:"Programmation web", credits:3},
                  {sigle:"INF2015", titre:"Développement de logiciels dans un environnement Agile", credits:3},
                  {sigle:"INF4170", titre:"Architecture des ordinateurs", credits:3},
                  {sigle:"INF4375", titre:"Paradigmes des échanges Internet", credits:3},
                  {sigle:"INM5151", titre:"Projet d'analyse et de modélisation", credits:3},
                  {sigle:"MGL7460", titre:"Réalisation et maintenance des logiciels", credits:3}]};


exports.index = function(req, res) {
  res.render('index', data);
};


exports.xml = function(req, res) {
  res.header("Content-Type", "application/xml");
  res.render('xml', data);
};


exports.json = function(req, res) {
  res.json(data);
};


