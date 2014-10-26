


a = function(s){

	var chars = ["a","b","c","d","e","f"];

	var i = 0;

	for(;;i++){

		if(s < Math.pow(16,i)){
				i --;
				break;
			}
	}

	var output = "";

	for(j=i;j>=0;j--){
		var b = Math.pow(16,j);
		var a = Math.floor(s/b);
		s = s - (a * b);

		if(a > 9){
			a = chars[a-10];
		}

		output += a
	}

	return output;
}

setInterval(function(){
  var span = document.createElement("span");
  var value = a(Math.floor(Math.random()*16777215));
  var text = document.createTextNode(value+ ".");

  span.style.backgroundColor = "#"+value;
  span.appendChild(text);
  //console.log(body.firstChild);
  document.body.insertBefore(span, document.body.firstChild);
},100);

