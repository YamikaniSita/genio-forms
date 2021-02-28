var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var FormSchema=new Schema({
	name:{
		type: String,
		required: true
	},secured:{
		type: Boolean,
		default: false
	}, createdOn:{
		type: Date, 
		default: Date.now()
	},
	password:{
		type: String
	},
	expiresOn:{
		type: Date
	},
	customerId:{
		type: Number,
		required: true
	},
	formSchema:{
		type: Array,
		default: []
	}
});

module.exports=mongoose.model('Form', FormSchema);
	