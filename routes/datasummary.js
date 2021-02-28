var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;

Router.post('/api/values/:formName', function(req, res){
	var fieldName=req.body.fieldName;
	var formName=req.params.formName;
	if(fieldName&&formName){
	db.collection('forms').findOne({name:formName}, function(err, data){
		var schema=data.formSchema;
		for(var i=0; i<schema.length; i++){;
			if(schema[i].name==fieldName){
				res.send(schema[i].values);
			}
		}
	});
	}
	else{
		res.send({error:{type:'undefined_parameters'}});
	}
});

Router.post('/api/summary/:formName', function(req, res){
	var formName=req.params.formName;
	var fieldName=req.body.fieldName;
	var value=req.body.value;
	var query={};
	query[fieldName]=value;
	db.collection(formName).find(query).toArray(function(err, data){
		var response={};
		response[value]=data.length;
		res.send(response);
	});
});

module.exports=Router;