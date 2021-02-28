var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('error'));
db.once('open', function callback(){
	console.log('done');
});

Router.post('/api/access', function(req, res){
	var formName=req.body.formName;
	var accessCode=req.body.accessCode;
	db.collection('forms').find({name:formName, password:accessCode}).toArray(function(err, data){
		if(err){
			console.log(err);
		}
		else{
			if(data.length>0){
				res.cookie('access_code', accessCode, {maxAge: 5000, httpOnly: true});
				res.send({message:'successful'});
			}
			else{
				res.send({error:'access_denied'});
			}
		}
	});
});

module.exports=Router;