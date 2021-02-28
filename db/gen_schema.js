var SchemeGenerator={};
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.pluralize(null);
var returnee={};
returnee.strict=false;
SchemeGenerator.generate=function(name, arr){
	for(var i=0; i<arr.length; i++){
		var controlName=arr[i].name;
		var type=arr[i].type;
		if(type=='number'){
			//number
			returnee[controlName]={
				type:Number
			};
		}
		else{
			returnee[controlName]={
            type:String
        };
	}
}
var obj=new Schema(returnee);
return mongoose.model(name, obj);
}
module.exports=SchemeGenerator;