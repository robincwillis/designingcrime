capitaliseFirstLetter = function(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}


haiku = function(){


 var adjs = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "bright", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
    "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
    "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
    "wandering", "withered", "wild", "black", "young", "holy", "solitary",
    "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless"
  ];
  var nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
    "frog", "smoke", "star", "sorrow"
  ];
  var rnd = Math.floor(Math.random()*Math.pow(2,12));

  var a = capitaliseFirstLetter( adjs[rnd>>6%64] );
  var b = capitaliseFirstLetter( nouns[rnd%64] );

  return a + " " + b;

}
var count = 250;
var values = [];

// for(var i = 0; i < count; i ++){
// 	values.push(haiku());
// }
//console.log(values);

setInterval(function(){
  //var span = document.createElement("span");
  //var text = document.createTextNode(haiku());
  //span.appendChild(text);
  document.getElementById('haiku').innerHTML=haiku();
  //document.body.appendChild(span);
},1000);

