var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;

Router.post('/api/create-api-session/:key', function(req, res){
	var key=req.params.key;
	console.log(key);
	db.collection('APIkey').findOne({key:key}, function(error, data){
		if(error){
			console.error(error);
			res.send({error:{message:'system_error'}});
		}
		else{
			if(data){
				res.cookie('api_key', key, {maxAge: 24*60*60*60, httpOnly: true});
				res.send({response:{message:'session_started'}});
			}
			else{
				res.send({error:{message:'invalid_key'}});
			}
		}
	});
});

module.exports=Router;