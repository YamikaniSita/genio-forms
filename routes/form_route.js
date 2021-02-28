var express=require('express');
var router=express.Router();
var fs=require('fs');
var rg=require('../routes/rg');

router.get('/form/:name', function(req, res){
	var name=req.params.name;
	var formData={};
	//read file
	var name=req.params.name;
	var formData={};
	//read file
	rg.getForm(name, function(result){
		if(result.length>0){
			//form exists
			//check security status
			if(result[0].secured==false){
				//print outright
				var content=rg.printForm(result);
				res.send(content);
			}
			else{
				//secured
				if(req.cookies['access_code']){
					//entered access code b4
					if(req.cookies['access_code']==result[0].password){
						//print form
						var content=rg.printForm(result);
						res.send(content);
					}
					else{
						//code wrong
						res.send(rg.loginPage(name));
					}
				}
				else{
					//code not there
					res.send(rg.loginPage(result.name));
				}
			}
		}
		else{
			fs.readFile('public/form404.html', 'utf8', function(err, data){
			if(err){
				console.log(err);
			}
			else{
				res.send(data);
			}
			});
		}
	});
});
module.exports=router;