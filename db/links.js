var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Link=new Schema({
	link_id:{
		type: String,
		required: true,
	},
	formName: {
		type: String,
		required: true
	},
	expiry: {
		type: Number,
		required: true
	}
});

module.exports=mongoose.model('Link', Link);