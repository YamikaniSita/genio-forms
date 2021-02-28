var express=require('express');
var Router=express.Router();
var mongoose=require('mongoose');
var rg=require('../routes/rg.js');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
var fs=require('fs');
Router.get('/access/:code', function(req, res){
	
	var code=req.params.code;
	db.collection('Link').findOne({link_id:code}, function(err, data){
		if(err){
			console.log(err);
			res.send('ERROR: REFRESH PAGE');
		}
		else{
			if(data){
				var formName=data.formName;
				rg.getForm(formName, function(result){
					if(result){
						var content=rg.printForm(result);
						db.collection('Link').deleteOne({formName:formName}, function(err, data){
							if(err){
								console.log(err);
								res.send('ERROR REFRESH PAGE');
							}
							else{
								res.send(content);
							}
						});
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
		}
	});
	
});

module.exports=Router;