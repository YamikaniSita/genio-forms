var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ApiSchema=new Schema({
	customer_id:{
		type: Number,
		required: true
	},key:{
		type: String,
		required: true
	}
});

module.exports=mongoose.model('APIkey', ApiSchema);