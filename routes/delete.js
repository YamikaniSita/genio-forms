var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('error'));
db.once('open', function callback(){
});

Router.get('/api/delete/:formName', function(req, res){
	var formName=req.params.formName;
	db.collection('forms').deleteOne({name:formName}, function(err, data){
		if(err){
			console.log(err);
			res.send({error:'sys_err'});
		}
		else{
			res.send({message:'success'});
		}
	});
});

module.exports=Router;