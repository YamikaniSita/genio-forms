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
var sg=require('../db/gen_schema.js');
router.post('/api/save', function(req, res){
	var schema=req.body.schema;
	var formName=req.body.formName;
	var y=0;
	db.collection('forms').updateOne({name:formName},{$set:{formSchema:schema}}, function(err, res){
	});
	res.send({message:'success'});
});
module.exports=router;