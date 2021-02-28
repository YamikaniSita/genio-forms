var mongoose=require('mongoose');
var provider={};
var formSchema=require('../db/formSchema.js');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
db.on('error', console.error.bind('connection error'));
db.once('open', function callback(){
	
});
provider.getSecurityStatus=function(form_name){
	db.collection('forms').find().toArray(function(err, data){
		return err;
	});
}
module.exports=provider;


