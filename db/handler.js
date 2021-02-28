var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/formsdb');
var db=mongoose.connection;
var Obj={};

Obj.getValues=function(formName, fieldName, callback){
	//gets possible values of the field to summarize
	var project={_id:0,formSchema:1};
	var values=0;
	db.collection('forms').findOne({name:formName}, {projection:project}, function(err, data){
		var schema=data.formSchema;
		for(var i=0; i<schema.length; i++){;
			if(schema[i].name==fieldName){
				return callback(schema[i].values);
			}
		}
	});
}

Obj.getOccurences=function(value, field, formName, callback){
	var query={};
	query[field]=value;
	db.collection(formName).find(query).toArray(function(err, data){
		if(err){
			console.log(err);
		}
		else{
			var res={};
			res[value]=data.length;
			return callback(
		}
	});
}
module.exports=Obj;