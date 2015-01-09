capitaliseFirstLetter = function(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var lastA = "";
var lastB = "";

haiku = function(){


 var adjs = [
    "startling", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "easy", "noisy", "delicate", "quiet", "white", "cool", "spring", "obsolete",
    "patient", "twilight", "bright", "crimson", "wispy", "weathered", "crimson",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "dripping",
    "long", "late", "lingering", "bold", "little", "perverse", "muddy", "old",
    "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
    "wandering", "withered", "wild", "black", "young", "holy", "solitary",
    "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless", "blind", "deep", "mundane", "wet"
  ];

  var nouns = [
    "blame", "shame", "work", "moon", "rain", "desire", "sea", "morning",
    "snow", "lake", "void", "turpentine", "shadow", "leaf", "time", "glitter",
    "forest", "hill", "clam", "shame", "goo", "glade", "vulture", "brook",
    "butterfly", "bush", "sap", "dust", "field", "fire", "form", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "poison", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
    "frog", "smoke", "star", "sorrow", "embassy", "base", "codex", "complex",
    "pool", "lamb", "folio", "pattern", "texture", "codex", "complex", "karma",
    "horizon", "sound", "flake", "works"
  ];

  var rnd1 = Math.floor((Math.random() * adjs.length) );
  var rnd2 = Math.floor((Math.random() * nouns.length) );
  var a = capitaliseFirstLetter( adjs[rnd1] );
  var b = capitaliseFirstLetter( nouns[rnd2] );

  //Pick Again, this is dumb, will do better next time
  if(a === lastA){
    rnd1 = Math.floor((Math.random() * adjs.length) );
    a = capitaliseFirstLetter( adjs[rnd1] );
  }

  if(b === lastB){
    rnd2 = Math.floor((Math.random() * nouns.length) );
    b = capitaliseFirstLetter( nouns[rnd2] );
  }

  lastA = a;
  lastB = b;

  return a + " " + b;

}
var count = 250;
var values = [];


setInterval(function(){
  document.getElementById('haiku').innerHTML=haiku();
},1000);

