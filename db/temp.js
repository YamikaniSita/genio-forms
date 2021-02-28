var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Temp=new Schema({
	id: {
		type:String
	},
	name:{
		type:String
	},size:{
		type:Number
	}
});

module.exports=mongoose.model('Temp', Temp);