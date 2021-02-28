var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('error'));
db.once('open', function callback(){
	console.log('done');
});

Router.post('/api/changesecurity/:formName', function(req, res){
	var changeObj=req.body.obj;
	var name=req.params.formName;
	db.collection('forms').update({name:name}, {$set:changeObj}, function(err, data){
		if(err){
			console.log(err);
			res.send({error:'sys_err'});
		}
		else{
			res.send({message:'done'});
		}
	});
});

module.exports=Router;