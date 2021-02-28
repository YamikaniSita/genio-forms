var express=require('express');
var router=express.Router();

router.post('/api/login', function(req, res){ 
	var cust_num=req.body.cust_num;
	var cust_password=req.body.cust_password;	
	if(cust_num.length>0&&cust_password.length>0){
		var time=7*24*60*60*60;
		res.cookie('cust_id', cust_num, {maxAge: time, httpOnly: true});
		res.send({message:'successful'});
	}
	else{
		res.send({message:'error'});
	}
	
});

module.exports=router;