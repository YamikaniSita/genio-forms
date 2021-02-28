var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var schemaGen=require('../db/gen_schema.js');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('connection err'));
db.once('open', function callback(){
	console.log('done');
});

//save a form || intercept request via POST to /form/:formName;

router.post('/form/:formName', function(req, res){
	var formName=req.params.formName;
	var success="<!DOCTYPE HTML><html><head><title>Form</title><link rel='stylesheet' type='text/css' href='../stylesheets/vendor/bootstrap/css/bootstrap.min.css'>";
	success=success+"<script type='text/javascript' src='../stylesheets/vendor/jquery/jquery.min.js'></script>";
	success=success+"<script type='text/javascript' src='../stylesheets/vendor/bootstrap/js/bootstrap.min.js'></script>";
	success=success+"<link rel='stylesheet' type='text/css' href='../stylesheets/semantic/semantic.min.css'>";
	success=success+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	success=success+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	success=success+"<link rel='stylesheet' type='text/css' href='../stylesheets/form.css'></head><body><div class='container'><h1>Successful</h1><p>Thank you.</p></div><footer>Powered by Genio Think</footer>";
	var error="<!DOCTYPE HTML><html><head><title>Form</title><link rel='stylesheet' type='text/css' href='../stylesheets/vendor/bootstrap/css/bootstrap.min.css'>";
	error=error+"<script type='text/javascript' src='../stylesheets/vendor/jquery/jquery.min.js'></script>";
	error=error+"<script type='text/javascript' src='../stylesheets/vendor/bootstrap/js/bootstrap.min.js'></script>";
	error=error+"<link rel='stylesheet' type='text/css' href='../stylesheets/semantic/semantic.min.css'>";
	error=error+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	error=error+"<link rel='stylesheet' type='text/css' href='../stylesheets/fontawesome/css/all.min.css'>";
	error=error+"<link rel='stylesheet' type='text/css' href='../stylesheets/form.css'></head><body><div class='container'><h1>Error</h1><p>A system error was experience. Try again by clicking this <a href='/form/"+formName+"'>link</a></p></div><footer>Powered by Genio Think</footer>";
	var result={};
	db.collection('forms').findOne({name:formName}, function(err, data){
		if(err){
			//error
		}
		else{
			//data
			var dataObj={};
			var x=0;
			for(var i in req.body){
				var key=data.formSchema[x].name;
				dataObj[key]=req.body[i];
				x++;
			}
			db.db.listCollections({name:formName}).next(function(err, coll){
					if(coll){
						db.collection(formName).insertOne(dataObj, function(err, data){
							if(err){
								res.send(error);
							}
							else{
								res.send(success);
							}
						});
					}
					else{
						var f=schemaGen.generate(formName, data.formSchema);
						var formInstance=new f(dataObj);
						formInstance.save(function(err, data){
						if(err){
							res.send(error);
						}
						else{
							res.send(success);
						}
						});
					}
			});
		}
	});
});

module.exports=router;