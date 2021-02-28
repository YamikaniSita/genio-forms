var express=require('express');
var Router=express.Router();
var ApiSchema=require('../db/apiSchema.js');
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;

Router.get('/api/generate', function(req, res){
	if(req.cookies['cust_id']){
		///logged in
		var cust_id=req.cookies['cust_id']*1;
		db.collection('APIkey').findOne({customer_id:cust_id}, function(err, data){
			if(err){
				console.log(err);
			}
			else{
				console.log(data);
				if(data){
					//already has a key
					res.send({key:data.key});
				}
				else{
					var str='';
					var src=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
					for(var i=0; i<10; i++){
						var rand=Math.round(Math.random()*35);
						str=str+src[rand];
					}
					var apiSchema=new ApiSchema({
						key:str,
						customer_id: cust_id
					});
					apiSchema.save(function(err, data){
						if(err){
							console.log(err);
						}
						else{
							res.send({key:str});
						}
					});
				}
			}
		});
	}
	else{
		res.send({message:'NO_SESSION'});
	}
});

module.exports=Router;