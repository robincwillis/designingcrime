fullscreen = {


	launchFullscreen : function(element) {
	  if(element.requestFullscreen) {
	    element.requestFullscreen();
	  } else if(element.mozRequestFullScreen) {
	    element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullscreen) {
	    element.webkitRequestFullscreen();
	  } else if(element.msRequestFullscreen) {
	    element.msRequestFullscreen();
	  }
	},

	launchIntoFullscreen  : function(element) {
	  if(element.requestFullscreen) {
	    element.requestFullscreen();
	  } else if(element.mozRequestFullScreen) {
	    element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullscreen) {
	    element.webkitRequestFullscreen();
	  } else if(element.msRequestFullscreen) {
	    element.msRequestFullscreen();
	  }
	},

	exitFullscreen : function() {
	  if(document.exitFullscreen) {
	    document.exitFullscreen();
	  } else if(document.mozCancelFullScreen) {
	    document.mozCancelFullScreen();
	  } else if(document.webkitExitFullscreen) {
	    document.webkitExitFullscreen();
	  }
	},

	dumpFullscreen : function() {
	  console.log("document.fullscreenElement is: ", document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
	  console.log("document.fullscreenEnabled is: ", document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
	},

	init : function() {
		var html =  "";
		html += '<div class="controls" style="position:fixed; top: 0; padding:20px;">'
    html += 	'<button onclick="fullscreen.launchFullscreen(document.documentElement);" class="sexyButton">Launch Fullscreen</button>';
    html += 	'<button onclick="fullscreen.exitFullscreen();" class="sexyButton">Hide Fullscreen</button>';
    html += 	'<button onclick="fullscreen.dumpFullscreen();" class="sexyButton">Dump Fullscreen Property Data</button>';
  	html += '</div>';

  	$('body').append(html);
	}

}

console.log('ok this all got ran');
