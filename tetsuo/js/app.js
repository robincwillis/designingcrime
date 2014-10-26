var app = app || {};
app.main = {
	init : function(){
		app.scene.initRenderer();
		app.scene.initCam();
		app.scene.initMaterials();
		app.scene.initLights();
		app.scene.initObjects();
		app.scene.initScene();
		app.scene.animate();
	}
};

app.main.init();
