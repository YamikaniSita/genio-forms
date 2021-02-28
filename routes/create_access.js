var mongoose=require('mongoose');
var express=require('express');
var Router=express.Router();
var rg=require('../routes/rg.js');
var Links=require('../db/links.js');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;

Router.post('/api/getaccess/:formName', function(req, res){
	var formName=req.params.formName;
	var key=req.body.key;
	var expiry=req.body.expiry;
	if(key&&expiry){
		
		//check existance of key
		db.collection('APIkey').findOne({key:key}, function(err, data){
			if(data){	
				//check if form exists
				var t=formName.toString();
				rg.getForm(formName, function(result){
					if(result.length>0){
						console.log(result);
						if(result[0].secured){
							var str='';
							var src=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
							for(var i=0; i<10; i++){
								var rand=Math.round(Math.random()*35);
								str=str+src[rand];
							}
							var newLink=new Links({
								link_id:str,
								formName: formName,
								expiry: expiry
							});
							newLink.save(function(err, data){
								if(err){
									console.log(err);
									res.send({error:{type: "system_error2",remedy: "try_again"}});
								}
								else{
									res.send({response:{link: '/access/'+str,expiry: expiry}});
								}
							});
						}
						else{
							res.send({error:{type: "form_not_secure",remedy: "set_Security"}});
						}
					}
					else{
						res.send({error:{type: "form_not_found",remedy: ""}});
					}
				});
			}
			else{
				//key not found
				res.send({error:{type: "invalid_key",remedy: "create_key"}});
			}
		});
		
	}
	else{
		//invalid link
		res.send({error:{type: "invalid_query",remedy: "fix_errors"}});
	}
});

module.exports=Router;