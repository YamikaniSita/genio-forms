//secure form handling
$('.btn').click(function(){
	var code=$('input').val();
	var formName=extractFormName();
	if(code){
		$.ajax({
			url: '../api/access',
			data:{
				formName:formName,
				accessCode:code
			},
			method: 'POST',
			success:function(result){
				if(result.message){
					var l=window.location;
					window.location=l;
				}
				else{
					//error
					alert('Invalid access code');
				}
			}
		});
	}
});
function extractFormName(){
	var currentLink=window.location.href;
    var i=true;var b=0;
    for(var s=0; s<currentLink.length; s++){
        if(currentLink[s]=='/'){
            //first occurrence
            if(i==false){
                b=s;
            }
            else{
                i=false;
            }
        }
    }
    var str='';
	for(var s=b+1; s<currentLink.length; s++){
		str+=currentLink[s];
	}
	return str;
}