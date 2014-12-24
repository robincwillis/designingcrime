capitaliseFirstLetter = function(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
};


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
    "polished", "ancient", "purple", "lively", "nameless", "blind", "deep", "mundane"
  ];

  var nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
    "frog", "smoke", "star", "sorrow", "embassy", "base", "codex", "complex",
    "pool", "lamb", "folio", "pattern", "texture", "codex", "complex", "karma",
    "horizon", "sound", "flake"
  ];

  var rnd1 = Math.floor((Math.random() * adjs.length) );
  var rnd2 = Math.floor((Math.random() * nouns.length) );
  var a = capitaliseFirstLetter( adjs[rnd1] );
  var b = capitaliseFirstLetter( nouns[rnd2] );

  return a + " " + b;

}
var count = 250;
var values = [];


setInterval(function(){
  document.getElementById('haiku').innerHTML=haiku();
},1000);

