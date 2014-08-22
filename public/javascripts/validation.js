/*
-Une fonction qui prend un url comme paramètre 
 et retourne les informations d'un cours donné à
 l'uqam à l'automne 2013
*/
 function httpGet(theUrl)
  {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }
 /*
  -Une fonction qui permet de vérifier l'éxistance
  d'un groupe dans un json
 */
 function estExiste(unJson){
    var valider=true;
   if(unJson.groupe==null){
       valider=false;
   }
    return valider;
 }
 /*
  - Une fonction qui prend une liste de cours comme 
   paramètre et qui permet de vérifier s'il éxiste 
   un conflit d'horaire entre les cours de cette liste.
   -On vérifie entre chaque deux groupe-cours de cette liste
   si le groupe-cours1 et le groupe-cours2 ont le meme jour 
   après on vérifie si le debut du groupe-cours1 il est entre
   le debut et la fin du groupe-cours2 si non on vérifie si 
   la fin du cours1 entre le debut et la fin du groupe-cours2.  
 
 */
function verifierConflitHoraire(listCours){
  var msg="pas de conflit";
  var programme=document.forms["myForm"].elements[1].value;
   for(var i=0;i<listCours.length-1;i++){
      var jsonI=JSON.parse(httpGet("/info/"+programme+"/"+listCours[i].sigle+"/"+listCours[i].groupe));
      for(var j=i+1;j<listCours.length;j++){	    
		  var jsonJ=JSON.parse(httpGet("/info/"+programme+"/"+listCours[j].sigle+"/"+listCours[j].groupe));
		  for(var k=0;k<jsonI.seances.length;k++){
		      for(var m=0;m<jsonJ.seances.length;m++){
			    if(jsonI.seances[k].jour==jsonJ.seances[m].jour){
				
				    if(jsonI.seances[k].debut>=jsonJ.seances[m].debut
					    && jsonI.seances[k].debut<jsonJ.seances[m].fin){
                            msg="Il ya un conflit d'horaire entre "+listCours[i].sigle+"-"+listCours[i].groupe		
						      +" et "+listCours[j].sigle+"-"+listCours[j].groupe;
					}//if
				   if(jsonI.seances[k].fin>jsonJ.seances[m].debut
					    && jsonI.seances[k].fin<=jsonJ.seances[m].fin){						
					     msg="Il ya un conflit d'horaire entre "+listCours[i].sigle+"-"+listCours[i].groupe		
						      +" et "+listCours[j].sigle+"-"+listCours[j].groupe;
					}// if
				 }//if
			  } //for m
		  }//for k
	  }//for j
   
   }//for i
   return msg;
}

/*
 Une fonction principale qui permet de valider les règles suivantes:
• L'étudiant doit s'inscrire à au moins un cours.
• L'étudiant ne peut pas s'inscrire à plus de cinq cours.
• L'étudiant doit avoir fourni son code permanent et son numéro de programme.
• Chaque cours demandé doit être offert à l'automne 2013 pour le programme de l'étudiant.
• Il doit y avoir une place disponible dans chaque cours demandé, on ne peut pas s'inscrire à 
un cours qui est plein.
• Il ne doit pas y avoir un conflit d'horaire, c'est-à-dire qu'aucune plage horaire d'aucun des 
cours n'est en conflit

*/
var message1="Chaque cours demandé doit être offert à l'automne 2013 pour le programme de l'étudiant.!";
var message2="Il doit y avoir au moin une place disponible dans chaque cours demandé.";
var message3="Vous devez vous inscrire à au moins un cours.";
var message4="Vous ne pouvez pas vous inscrire à plus de cinq cours.";
function validate() {
    var coursList = [];
	var cours;
	document.getElementById('validateMsg').innerHTML = '';
	var i = 2;
     var programme=document.forms["myForm"].elements[1].value;
	for(i == 2; i < 14 ; i++){
	var s=document.forms["myForm"].elements[i].value;
	var g=document.forms["myForm"].elements[i+1].value;	  
	i++;
	
  if ((s!="") && (g!=""))
      { 
	     var gInt=parseInt(g,10);
	    cours = {};
		
		if(s.length!=7 || gInt!=g){
		document.getElementById('validateMsg').innerHTML=message1;
         return false;
		}
		 coursList.push(cours);
		cours.sigle = s;
		
		cours.groupe = parseInt(g, 10);
		var sigle=JSON.stringify(cours.sigle);
		var groupe=JSON.stringify(cours.groupe);
		var jsonUrl=httpGet("/info/"+programme+"/"+cours.sigle+"/"+cours.groupe);
		var unJson=JSON.parse(jsonUrl);
		
		if(!estExiste(unJson)){
		document.getElementById('validateMsg').innerHTML= message1;
		return false;
	    }

		if(unJson.places_restantes===0){
		document.getElementById('validateMsg').innerHTML=message2;
		 return false;
		}
		
      }
	}
   	
	  var verifierConflit=verifierConflitHoraire(coursList);                            		
	  
	  if(verifierConflit!="pas de conflit"){
	     document.getElementById('validateMsg').innerHTML =verifierConflit;
	    return false;
	  }		
	 if (coursList.length == 0){ 
	   document.getElementById('validateMsg').innerHTML =message3 ;
	    return false;
	   }
	 if (coursList.length >= 6){   
	   document.getElementById('validateMsg').innerHTML = message4;
	   return false;
	   }	   	   
}


