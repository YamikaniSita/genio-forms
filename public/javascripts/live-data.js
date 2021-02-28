//Genio Think 2020

var header = document.getElementsByTagName('head')[0];
var chartjs = document.createElement('script');
chartjs.setAttribute('src', '../javascripts/chart.js/chart.js');
header.appendChild(chartjs);
var style=document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('type', 'text/css');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', '../javascripts/livestyle.css');
header.appendChild(style);

var state = act = false;

function LiveData(apiKey, gtype){
	//use apiKey
	this.apiKey=apiKey;
	this.act=false;
	this.gtype=gtype;
	this.values=[];
	this.colors=[];
	this.label='';
}

LiveData.prototype.startApiSession=function(elem, form, field){
	var ld=this;
	this.label=field;
	$.ajax({
		url: '/api/create-api-session/'+ld.apiKey,
		method: 'POST',
		success: function(data){
			if(data.error){
				console.error(data.error);
			}
			else{
				console.log(data.response.message);
				ld.act = true;
				ld.setupDom(elem, form, field);
			}
		},
		error: function(error){
			console.error('System error '+error);
		}
	});
}

LiveData.prototype.setupDom=function(elem, form, field){
	var liveContainer=document.createElement('div');
	liveContainer.setAttribute('class', 'live-container');
	elem.appendChild(liveContainer);
	$('.live-container').append("<button id='inactiveStatus' class='liveStatus'>Live</button><canvas id='liveCanvas'></canvas>");
	this.bindData(form, field);
}

LiveData.prototype.bindData = function(form, field){
	var ld=this;
	if(this.act){
		$.ajax({
			url: '/api/schema/'+form,
			method: 'GET',
			success: function(data){
				if(data.error){
					console.error(data.error.type);
				}
				else{
					//process schema
					var selectFields=ld.getSelectFields(data[0].formSchema);
					var exists=ld.searchForField(selectFields, field);
					if(exists){
						//start 
						$('.liveStatus').attr('id', 'activeStatus');
						ld.getFieldValues(form, field);
					}
					else{
						console.error('Field not found');
					}
				}
			},error:function(error){
				console.error('System error '+error);
			}
		});
	}
	else{
		console.error('No session found');
	}
}
LiveData.prototype.getSelectFields=function(obj){
	var returnee=[];
	for(var i=0; i<obj.length; i++){
		var field=obj[i];
		if(field.type=='select'||field.type=='radio'||field.type=='check'){
			returnee.push(field);
		}
	}
	return returnee;
}
LiveData.prototype.searchForField = function(array, field){
	for(var x=0; x<array.length; x++){
		var name=array[x].name;
		if(name === field){
			return true;
		}
	}
	return false;
}
LiveData.prototype.getFieldValues=function(form, field){
	var ld=this;
	$.ajax({
		url: '/api/values/'+form,
		method: 'POST',
		data: {
			fieldName:field
		},
		success: function(response){
			if(response.error){
				console.error(response.error.type);
			}
			else{
				ld.startLiveLoop(form, field, response);
			}
		},
		error: function(error){
			console.error('System error '+error);
		}
	});
}
LiveData.prototype.startLiveLoop=function(form, field, values){
	var ld=this;
	var hold=[];
	this.colors=createBackgroundColors(values);
	for(var x=0; x<values.length; x++){
		var value=values[x];
		$.ajax({
			url: '/api/summary/'+form,
			method: 'POST',
			timeout: 1000,
			data:{
				value:value,
				fieldName: field
				},
			success: function(data){
				ld.values.push(data);
				$('.liveStatus').attr('id', 'activeStatus');
			},error: function(error){
				console.log('System error '+error.status);
				$('.liveStatus').attr('id', 'inactiveStatus');
			}
		});
	}
	ld.handleDisplay();
	ld.startRedrawLoop(form, field, values);
}
LiveData.prototype.startRedrawLoop=function(form, field, values){
	var ld=this;
	setTimeout(function(){
		var hold=[];
		for(var x=0; x<values.length; x++){
			var value=values[x];
			$.ajax({
				url: '/api/summary/'+form,
				method: 'POST',
				timeout: 1000,
				data:{
					value:value,
					fieldName: field
				},
				success: function(data){
					$('.liveStatus').attr('id', 'activeStatus');
					ld.values.push(data);
				},error: function(error){
					console.log('System error...retrying '+error.status);
					$('.liveStatus').attr('id', 'inactiveStatus');
				}
			});
		}
		ld.handleDisplay();
		ld.startRedrawLoop(form, field, values);
	}, 30000);
}
LiveData.prototype.handleDisplay=function(){
	var ld=this;
	setTimeout(function(){
		ld.drawCanvas(ld.values);
		ld.values=[];
	},5000);
}
LiveData.prototype.drawCanvas=function(obj){
	var labels=[];
	var values=[];
	for(var x=0; x<obj.length; x++){
		var el=obj[x];
		for(var i in el){
			labels.push(i);
			values.push(el[i]);
		}
	}
	this.draw(labels, values, this.gtype, 'label');
}
LiveData.prototype.draw=function(labels, values, gtype, label){
	var ctx=document.getElementById('liveCanvas');
	var colors=this.colors;
	var label=this.label;
		var data={
			labels:labels,
			datasets:[{
				label:label,
				data:values,
				fill:true,
				borderColor: 'white',
				backgroundColor: colors,
				borderDash: [5,5]
			}]
		};
		var options={
			legend:{
				display:true,
				position: 'top',
				labels:{
					boxWidth:80,
					fontColor:'black'
				}
			},options:{
				responsive: false
			}
		};
		var mc=new Chart(ctx, {
			type:gtype,
			data:data,
			options:options
		});
	}
function createBackgroundColors(values){
	var colors=['grey','red','green','blue','pink','orange','#ffc', '#dca', '#ffa', '#aac', '#fca', '#aac','ffc'];
	var generated=[];
	for(var i=0; i<values.length; i++){
		var rand=Math.round(Math.random()*6);
		generated.push(colors[rand]);
	}
	return generated;
}