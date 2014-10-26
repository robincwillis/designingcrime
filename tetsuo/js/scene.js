//var app = app || {};


app.scene = {

	container : $('#container'),
	camera : {},
	stage : new THREE.Scene(),
	lights : {},
	materials : {},
	renderer : new THREE.WebGLRenderer({antialias: true}),

	width : 800,
	height : 600,

	initRenderer : function(){
		app.scene.renderer.setClearColor(0xEEEEEE, 1.0);
		app.scene.renderer.setSize(app.scene.width,app.scene.height);
	    app.scene.renderer.clear();

	    app.scene.container.append(app.scene.renderer.domElement);
	},

	initCam: function(){
		var VIEW_ANGLE 	= 45,
		ASPECT 		= app.scene.width/app.scene.height,
		NEAR 		= 1,
		FAR 		= 10000;

		app.scene.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
		app.scene.camera.position.z = 1000;

	},

	loaderCallback: function(){

	},

	initMaterials : function(){
		app.scene.materials.baseMaterial = new THREE.MeshLambertMaterial({
							color: 0xffffff,
							ambient: 0xffffff

						});

		app.scene.materials.baseMaterial.side = THREE.DoubleSide;

		app.scene.materials.wireMaterial = new THREE.MeshLambertMaterial({
			color: 0x000000,
			ambient: 0x000000,
			wireframe: true, tranparent : true });

		app.scene.materials.lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
	},

	initObjects : function(){
		//make a series of brick clusters
		//var b = app.geometry.makeBrick(new THREE.Vector3(0,0,0), 4, 200, 150, 0);
		var c1 = app.geometry.makeCluster(new THREE.Vector3(0,0,0), 450, 9,90,30,13,50);
		var c2 = app.geometry.makeCluster(new THREE.Vector3(0,-600,-400), 400, 6,80,20,15,40);
		var c3 = app.geometry.makeCluster(new THREE.Vector3(-600,0,-400), 875, 4,40,10,15,30);
		//var sprite = document.createElement( 'img' );
		//sprite.src = 'textures/2.png';
		//console.log(b);

		var mapA = THREE.ImageUtils.loadTexture( "img/1.png");

		var scaleX = mapA.image.width;
		var scaleY = mapA.image.height;

		console.log(scaleX);

		var materialA3 = new THREE.SpriteMaterial( { map: mapA, useScreenCoordinates: false, opacity: 1 } );
		sprite = new THREE.Sprite( materialA3 );
		sprite.position.set(-260, 0, 0 );
		//prite.position.set( x, y, z );
		//sprite.position.normalize();
		sprite.scale.set( 700,1000, 0 );
		console.log(sprite);


	},

	initLights : function(){
		app.scene.lights.ambientLight = new THREE.AmbientLight(  0x404040 );
		app.scene.lights.light = new THREE.SpotLight(0xFFFFFF);
		// set its position
		app.scene.lights.light.position.set( 170, 230, -160 );
		app.scene.lights.light.intensity = 100;

		app.scene.lights.light2 = new THREE.DirectionalLight( 0xffffff );
		app.scene.lights.light2.position.set( 0.5, 0.5, 1 );


		app.scene.lights.pointLight = new THREE.PointLight( 0xffffff );
		app.scene.lights.pointLight.position.set( 0, -100, -100 );
	},

	initScene : function(){

		app.scene.stage.add(app.scene.camera);

		//app.scene.stage.add( sprite );

		app.scene.stage.add(app.scene.lights.light);
		app.scene.stage.add(app.scene.lights.light2);

		for(i=0;i<app.geometry.bricks.length; i++){
			app.scene.stage.add(app.geometry.bricks[i].lines);
			app.scene.stage.add(app.geometry.bricks[i].mesh);

		}


	},

	animate : function(){
		app.scene.renderer.render(app.scene.stage, app.scene.camera);
		window.requestAnimationFrame(app.scene.animate, app.scene.renderer.domElement);

		app.scene.rotate();
		app.scene.ascend();

	},


	ascend : function(){

		for(i=0; i < app.geometry.bricks.length; i++){

        	app.geometry.bricks[i].mesh.position.y += 0.5;
    		app.geometry.bricks[i].lines.position.y += 0.5;

       		if(app.geometry.bricks[i].mesh.position.y > app.scene.height){

       			var newX = app.util.randomizeSigned(600), newY = app.util.randomizeSigned(600)-app.scene.height, newZ = app.util.randomizeSigned(600);

       			app.geometry.bricks[i].mesh.position.x = newX;
				app.geometry.bricks[i].mesh.position.y = newY;
				app.geometry.bricks[i].mesh.position.z = newZ;

				app.geometry.bricks[i].lines.position.x = newX;
				app.geometry.bricks[i].lines.position.y = newY;
				app.geometry.bricks[i].lines.position.z = newZ;

       		}


        }

	},

	rotate : function(){

		for(i=0; i < app.geometry.bricks.length; i++){
        	if(i%2 == 0){
        	app.geometry.bricks[i].mesh.rotation.x += 0.01;
        	app.geometry.bricks[i].mesh.rotation.y += 0.01;
        	app.geometry.bricks[i].mesh.rotation.z += 0.01;

        	app.geometry.bricks[i].lines.rotation.x += 0.01;
        	app.geometry.bricks[i].lines.rotation.y += 0.01;
        	app.geometry.bricks[i].lines.rotation.z += 0.01;

        	}else{
			app.geometry.bricks[i].mesh.rotation.x -= 0.01;
        	app.geometry.bricks[i].mesh.rotation.y -= 0.01;
        	app.geometry.bricks[i].mesh.rotation.z -= 0.01;

        	app.geometry.bricks[i].lines.rotation.x -= 0.01;
        	app.geometry.bricks[i].lines.rotation.y -= 0.01;
        	app.geometry.bricks[i].lines.rotation.z -= 0.01;
        	}

        }

	}

}