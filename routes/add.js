var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var formSchema=require('../db/formSchema.js');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('connection error'));
db.once('open', function callback(){
	console.log('done');
});
router.post('/api/add/:name', function(req, res){
	var formName=req.params.name;
	var userId=req.cookies['cust_id'];
	if(formName&&formName.length>0&&userId){
		var newForm=new formSchema({
			name: formName,
			customerId: userId
		});
		newForm.save(function(error, data){
			if(error){
				res.send({error:'failed'});
				console.log('db_error '+error);
			}
			else{
				res.send({name:formName});
				}
			});
	}
	else{
		res.send({error:'system_error'});
	}
});
module.exports=router;