var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('error'));
db.once('open', function callback(){
	console.log('done');
});

Router.post('/api/securitystate/:formName', function(req, res){
	var formName = req.params.formName;
	if(req.cookies['cust_id']){
		//logged in
		db.collection('forms').findOne({name: formName}, {projection:{_id:0,expiresOn:0,name:0,createdOn:0,formSchema:0,customerId:0,name:0}}, function(err, data){
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
		res.send({error:'no_session'});
	}
});

module.exports=Router;
