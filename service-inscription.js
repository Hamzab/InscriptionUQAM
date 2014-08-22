var fs = require('fs');

exports.writeXML = function(callback,body){
   var xml="<?xml version='1.0' encoding='UTF-8' ?>\n";
   xml+="<etudiant>\n   <code_permanent>"+ body["code_permanent"] +"</code_permanent>\n";
   xml+="   <numero_programme>"+ body["numero_programme"] +"</numero_programme>\n";

    for(var i=1;i<6;i++){
		if(body["sigle"+i]!==""){
		xml+="   <cours>\n";
		xml+="       <sigle>"+body["sigle"+i]+"</sigle>\n";
		xml+="       <groupe>"+body["groupe"+i]+"</groupe>\n";
		xml+="   </cours>\n";
		}
	}
	xml+="</etudiant>";
	callback(null,xml);	
	
	var xmlFile=fs.writeFile("etudiant.xml",xml, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Un fichier etudiant.xml a été sauvgardé!");
    }
});	

}
