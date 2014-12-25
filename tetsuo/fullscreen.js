(function (element) {

	'use strict';

	function enterFullscreen(){
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}

	function exitFullscreen(){
		if(document.exitFullscreen) {
			document.exitFullscreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}

	function toggleVisible(e){
		if(e.charCode === 102 ) {
			if(document.getElementById("fullscreen-controls").style.display == "none" ) {
				document.getElementById("fullscreen-controls").style.display = "";
			}
			else {
				document.getElementById("fullscreen-controls").style.display = "none";
			}
		}
	}

	function init(){
		var controls = document.createElement('div');
		controls.setAttribute('id', 'fullscreen-controls');
		controls.style.cssText = 'position:fixed; top: 0; left: 0; padding:10px;';

		var enterButton = document.createElement("input");
		enterButton.type = "button";
		enterButton.value = "Launch Fullscreen";

		var exitButton = document.createElement("input");
		exitButton.type = "button";
		exitButton.value = "Exit Fullscreen";

		controls.appendChild(enterButton);
		controls.appendChild(exitButton);

		document.body.appendChild(controls);
		document.body.addEventListener('keypress', function (e) {
			toggleVisible(e);
		});

		enterButton.addEventListener("click", enterFullscreen);
		exitButton.addEventListener("click", exitFullscreen);
	}

	addEventListener("DOMContentLoaded", init);

})(document.documentElement);
