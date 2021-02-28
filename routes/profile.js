var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('connection error'));
db.once('open', function callback(){
	console.log('done');
});
router.get('/api/profile', function(req, res){
	var cookieValue=req.cookies['cust_id'];
	if(cookieValue){
		var cookieToNum=cookieValue*1;
		db.collection('forms').find({customerId:cookieToNum}, {projection:{_id:0,expiresOn:0,password:0,createdOn:0,secured:0}}).toArray(function(err, data){
			if(err){
				res.send({error:'system_err'});
				console.log(err);
			}
			else{
				res.send({customerId:cookieValue,forms:data});
				}
		});
	}
	else{
		res.send({error:'no_session'});
	}
});
module.exports=router;