var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('connection error'));
db.once('open', function callback(){
	console.log('done');
});
router.get('/api/schema/:name', function(req, res){
	if(req.params.name||req.params.length>0){
		if(req.cookies['cust_id']){
			var name=req.params.name;
			db.collection('forms').find({name:name}, {projection:{_id:0,expiresOn:0,password:0,createdOn:0,secured:0,name:0}}).toArray(function(err, data){
				if(err){
					res.send({error:{type:'system_err'}});
				}
				else{
					res.send(data);
				}
			});
		}
		else{
			res.send({error:{type:'session_error'}});
		}
	}
	else{
		res.send({error:{type:'req_error'}});
	}
});
module.exports=router;