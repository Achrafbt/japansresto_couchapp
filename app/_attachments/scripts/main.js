function createDoc(){
		
	var recipe = $("#recipe").val();
	var hoeveelheid = $("#hoeveelheid").val();
	var tafelnummer = $("#tafelnummer").val();
	var opmerkingen = $("#opmerkingen").val();
	var datum = $("#datum").val();
	
	var doc = {};
	
	doc.recipe = recipe;
	doc.hoeveelheid = hoeveelheid;
	doc.tafelnummer = parseInt(tafelnummer);
	doc.opmerkingen = opmerkingen;
	doc.datum = datum;
	
	var json = JSON.stringify(doc);
	
	console.log(json);
	
	$.ajax({
		type: 	'PUT',
		url: 	'../../' + recipe,
		data: 	json,
		contentType: 'application/json',
		async: 	true,
		success: function(data){
			//var response = JSON.parse(data);
			//console.log(response);
			//buildOutput();
			var html = '<table border="1">';
			html += '<tr><p>Recipe: ' + doc.recipe + '</p><p>Hoeveelheid: ' + doc.hoeveelheid + '</p><p>tafelnummer: ' + doc.tafelnummer + '</p><p>opmerkingen: ' + doc.opmerkingen + '</p></tr>';
			html += '</table>';
        	//console.log(html);
        	$('#output').html(html);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}

function buildOutput(){
	
	$('#output').empty();
	var html ='<table class="table table-hover">';
	
	
	$.ajax({
		type: 	'GET',
		url: 	'../../_all_docs?include_docs=true',
		async: 	false,
		success: function(data){
			var arr = JSON.parse(data).rows;
			
			for(var i=0; i<arr.length; i++){
				
				if(arr[i].id.indexOf('_design') == -1){
					var doc = arr[i].doc;
					html += '<tr><td>' + doc.recipe + '</td><td>' + doc.hoeveelheid + '</td><td>' + doc.tafelnummer + '</td><td>' + doc.opmerkingen + '</td><td>' + doc.datum + '</td>';
				}
			}
			html += '</table>';
			$('#output').html(html);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}

