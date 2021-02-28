var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/formsdb');
var db=mongoose.connection;

Router.post('/api/query/:formName', function(req, res){
	var formName=req.params.formName;
	var userQuery=req.body.query;
	var obj={};//projection for query
	obj['_id']=0;
	for(var i=0; i<userQuery.length; i++){
		obj[userQuery[i]]=1;
	}
	if(formName){
		db.collection(formName).find({}, {projection:obj}).toArray(function(err, data){
			if(err){
				console.log(err);
				res.send({error:'sys_error'});
			}
			else{
				res.send(data);
			}
		});
	}
	else{
		res.send({error:'invalid_form'});
	}
		
});

module.exports=Router;