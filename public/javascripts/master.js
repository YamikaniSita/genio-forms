//require('jquery');
function closeLoader(){
	$('.load-pane').fadeOut('fast');
}
function changeForm(ev){
	ev.preventDefault();
	document.getElementById('currentForm').value=ev.target.innerHTML.trim();
}
function getCurrentForm(){
	return document.getElementById('currentForm').value.trim()
}
function deleteForm(){
	var currForm=getCurrentForm();
	if(confirm('This will delete this form and make it inaccessible to all users with its link. Your data will still be stored though. Continue?')){
		$.ajax({
			url: '../api/delete/'+currForm,
			method: 'GET',
			success: function(result){
				window.location='index.html'
			}
		});
	}
}
function showQueryResultScreen(){
	$('#query-pane').hide();
	$('.data-pane').show();
}
function showQueryScreen(){
	$('#query-pane').show();
	$('.data-pane').hide();
}

function closeResult(){
	showQueryScreen();
	$('#result').html('');
}
function createRowsColumns(obj){
	var col='';
	var row='';
	var table='';
	for(var i in obj){
		row='<tr>';
		var t=obj[i];
		for(var x in t){
			col='';
			col='<td>'+t[x]+'</td>';
			row=row+col;
		}
		table=table+row;
		
	}
	$('#result').append(table);
}
function getSelectFields(obj){
	var returnee=[];
	for(var i=0; i<obj.length; i++){
		var field=obj[i];
		if(field.type=='select'||field.type=='radio'||field.type=='check'){
			returnee.push(field);
		}
	}
	return returnee;
}
function buildVisual(obj, gtype, label){
	//GET VALUES AND LABELS4
	setTimeout(function(){
		var labels=[];
		var values=[];
		for(var x=0; x<obj.length; x++){
			var el=obj[x];
			for(var i in el){
				labels.push(i);
				values.push(el[i]);
			}
		}
		draw(labels, values, gtype, label);
		
	},5000);
}
function draw(labels, values, gtype, label){
		var ctx=document.getElementsByTagName('canvas')[0];
		var colors=createBackgroundColors(values);
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
	var colors=['grey','red','green','blue','pink','orange'];
	var generated=[];
	for(var i=0; i<values.length; i++){
		var rand=Math.round(Math.random()*6);
		generated.push(colors[rand]);
	}
	return generated;
}