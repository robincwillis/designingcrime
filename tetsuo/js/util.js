//var app = app || {};

app.util = {

	randomizeBounds : function(upper, lower){
		return (Math.random() * (upper-lower) )+lower;
	},

	randomize : function(val){
		return Math.random()*val;
	},

	randomizeSigned : function(val){
		var num = Math.random()*val; // this will get a number between 1 and 99;
		num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		return num;
	},

	makeShaderMaterial : function(){

	}

};