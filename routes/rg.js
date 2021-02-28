var mongoose=require('mongoose');
var fs=require('fs');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('connection error'));
db.once('open', function callback(){
	console.log('done');
});

var ResponseGenerator={};

ResponseGenerator.printForm=function(fd){
	var uc="<!DOCTYPE HTML><html><head><title>Form</title><link rel='stylesheet' type='text/css' href='../stylesheets/vendor/bootstrap/css/bootstrap.min.css'>";
	uc=uc+"<script type='text/javascript' src='../stylesheets/vendor/jquery/jquery.min.js'></script>";
	uc=uc+"<script type='text/javascript' src='../stylesheets/vendor/bootstrap/js/bootstrap.min.js'></script>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/semantic/semantic.min.css'>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/form.css'></head><body><div class='container'>";
	var lc="</div><footer>Powered by Genio Think</footer>";
	var formname=fd[0].name;
	var formString="<form action='/form/"+formname+"' method='POST'>";
	var schema=fd[0].formSchema;
	var str="";
	for(var i=0; i<schema.length; i++){
		var controlName=schema[i].name;
		var type=schema[i].type;
		var length=schema[i].length;
		var required=schema[i].length;
		var placeholder=schema[i].placeholder;
		var len=schema[i].length;
		var r=schema[i].required;
		var required='';
		var lim;
		if(len){
			lim=len;
		}
		if(r=='true'){
			required='required';
		}
		else{
			required='false';
		}
		var helper=schema[i].helper;
		str=str+"<div class='form-field'>";
		str=str+"<div class='helper'>"+helper+"</div>";
		if(type=='select'){
			var values=schema[i].values;
			var t="<select name='"+controlName+"'>";
			for(var x=0; x<values.length; x++){
				t=t+"<option value='"+values[x]+"'>"+values[x]+"</option>";
			}
			t=t+"</select>";
			str=str+t;
		}
		else if(type=='radio'){
			var values=schema[i].values;
			for(var x=0; x<values.length; x++){
				str=str+values[x]+"<input name='"+controlName+" 'value='"+values[x]+"' type='radio'"+required+"></input>";
			}
		}
		else if(type=='check'){
			var values=schema[i].values;
			for(var x=0; x<values.length; x++){
				str=str+values[x]+"<input name='"+controlName+" 'value='"+values[x]+"' type='checkbox'"+required+"></input>";
			}
		}
		else if(type=='text-area'){
			str=str+"<textarea name='"+controlName+"' "+required+" placeholder='"+placeholder+"' max-length='"+lim+"'></textarea>";
		}
		else{
			str=str+"<input type='"+type+"' name='"+controlName+"' "+required+" placeholder='"+placeholder+"' max-length='"+lim+"'/>";
		}
		str=str+"</div>";
	}
	return uc+formString+str+"<button type='submit' class='btn btn-primary'>Submit Form</button></form>"+lc;
}
ResponseGenerator.getForm=function(name, callback){
	var promise=new Promise(function(resolve, reject){
		db.collection('forms').find({name:name}).toArray(function(err, data){
			if(err){
				return reject(err);
			}
			resolve(data);
		});
	});
	promise.then(function(result){
		return callback(result);
	},function(error){
		// return callback(error);
	});
	
}
ResponseGenerator.loginPage=function(formName){
	var uc="<!DOCTYPE HTML><html><head><title>Form</title><link rel='stylesheet' type='text/css' href='../stylesheets/vendor/bootstrap/css/bootstrap.min.css'>";
	uc=uc+"<script type='text/javascript' src='../stylesheets/vendor/jquery/jquery.min.js'></script>";
	uc=uc+"<script type='text/javascript' src='../stylesheets/vendor/bootstrap/js/bootstrap.min.js'></script>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/semantic/semantic.min.css'>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	uc=uc+"<link rel='stylesheet' type='text/css' href='../stylesheets/form.css'></head><body><div class='container'>";
	uc=uc+"<h1>Secure form</h1><p>Enter access code</p><input id='input' type='password' class='form-control' placeholder='Enter access code'><button class='btn btn-default' id='btn'>Access form</button>";
	uc=uc+"<script type='text/javascript' src='../javascripts/secure.js'></script>";
	return uc;
};
module.exports=ResponseGenerator;