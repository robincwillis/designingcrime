//var app = app || {};


app.geometry = {

	bricks : [],
	clusters : [],

	Brick : function(origin, numSides, size, thickness, rand ){
		
		this.meshGeometry = new THREE.Geometry();
		this.lineGeometry = new THREE.Geometry();
		
		this.cp1 =new THREE.Vector3(0,0,0);
		this.cp2 =new THREE.Vector3(0,0,thickness); 

		this.meshGeometry.vertices.push(this.cp1);

		//first side
		var face1 = app.geometry.buildFace(numSides, this.cp1, size, rand);
	
		this.meshGeometry.vertices.push.apply(this.meshGeometry.vertices, face1 );


		for(i=1; i<numSides; i++){
			
			this.meshGeometry.faces.push( new THREE.Face3( 0, i, i+1 ));
			
			this.lineGeometry.vertices.push(this.meshGeometry.vertices[i]);
			this.lineGeometry.vertices.push(this.meshGeometry.vertices[i+1]);
		}
		this.meshGeometry.faces.push(new THREE.Face3(0,numSides, 1));
		this.lineGeometry.vertices.push(this.meshGeometry.vertices[numSides]);
		this.lineGeometry.vertices.push(this.meshGeometry.vertices[1]);

		this.meshGeometry.vertices.push(this.cp2);

		//second side
		var face2 = app.geometry.buildBackFace(face1, this.cp2, rand);
		this.meshGeometry.vertices.push.apply(this.meshGeometry.vertices, face2 );

		for(i=1; i<numSides; i++){
			this.meshGeometry.faces.push( new THREE.Face3( numSides+1, numSides+1+i, numSides+i+2 ));
			this.lineGeometry.vertices.push(this.meshGeometry.vertices[numSides+1+i]);
			this.lineGeometry.vertices.push(this.meshGeometry.vertices[numSides+i+2]);
			
		}
		//last triangle
		this.meshGeometry.faces.push(new THREE.Face3(numSides+1,numSides+numSides+1, numSides+2));
		this.lineGeometry.vertices.push(this.meshGeometry.vertices[numSides+numSides+1]);
		this.lineGeometry.vertices.push(this.meshGeometry.vertices[numSides+2]);


		//connection
		for(i=1;i<numSides;i++){
			this.meshGeometry.faces.push(new THREE.Face3( i,i+numSides+1,i+1));
			this.meshGeometry.faces.push(new THREE.Face3( i+1,i+numSides+1,i+numSides+2));

			this.lineGeometry.vertices.push(this.meshGeometry.vertices[i]);
			this.lineGeometry.vertices.push(this.meshGeometry.vertices[numSides+i+1]);
		}
		//close it
		this.meshGeometry.faces.push(new THREE.Face3( 1,numSides+2,(numSides*2)+1));
		this.meshGeometry.faces.push(new THREE.Face3( 1,numSides,(numSides*2)+1));

		this.lineGeometry.vertices.push(this.meshGeometry.vertices[numSides]);
		this.lineGeometry.vertices.push(this.meshGeometry.vertices[(numSides*2)+1]);

		this.meshGeometry.computeBoundingSphere();
		this.meshGeometry.computeFaceNormals();

		this.mesh = app.geometry.makeBrickMesh(this.meshGeometry);
		this.lines = app.geometry.makeBrickLines(this.lineGeometry);

		this.mesh.doubleSided = true;

		this.mesh.position.x = origin.x;
		this.mesh.position.y = origin.y;
		this.mesh.position.z = origin.z;

		this.lines.position.x = origin.x;
		this.lines.position.y = origin.y;
		this.lines.position.z = origin.z;
		
		var rotX = Math.random(), rotY = Math.random(), rotZ = Math.random();
		
		this.mesh.rotation.x += rotX;
		this.mesh.rotation.y += rotY;
		this.mesh.rotation.z += rotZ;

		this.lines.rotation.x += rotX;
		this.lines.rotation.y += rotY;
		this.lines.rotation.z += rotZ;	
	},

	buildFace : function(numSides, cp, size, rand){

		var angle = 2*Math.PI/numSides;

		var face = [];

		for(var j=0; j< numSides; j ++){

			var rX = app.util.randomizeSigned(rand);
			var rY = app.util.randomizeSigned(rand);

			var pt = new THREE.Vector3(cp.x + rX + size * Math.sin(angle*j) , cp.y + rY + size * Math.cos(angle*j),cp.z);
			//var pt = new THREE.Vector3(0,0,0);
			face.push(pt);
			
		}
		return face;
	},

	buildBackFace : function(face1, cp2, rand){
		var face2 = [];
		for(var j=0;j<face1.length;j++){
			var rX = app.util.randomizeSigned(rand);
			var rY = app.util.randomizeSigned(rand);
	
			var pt = new THREE.Vector3();
			//pt.add(cp2,face1[i]);
				
			pt.x = face1[j].x;
			pt.y = face1[j].y;
			pt.z = cp2.z;
				
			pt.x += rX;
			pt.y += rY;
		

			face2.push(pt);
		}
		return face2;
	},

	makeBrickLines : function(geometry){
		return new THREE.Line( geometry, app.scene.materials.lineMaterial, THREE.LinePieces);
	},

	makeBrickMesh : function(geometry){
		return new THREE.Mesh(geometry, app.scene.materials.baseMaterial);
	},

	setBrickPosition : function(brick){

	},

	Cluster : function(origin, offset, numSides, size, thickness ,rand, count){
		// this.numSides = numSides;
		// this.size = size;
		// this.thickness = thickness;
		// this.rand = rand;
		// this.count = count;
		this.bricks = [];

		for(var i = 0; i < count; i++){

			

			var pos = new THREE.Vector3(
				
				app.util.randomizeSigned(offset) + origin.x,
				app.util.randomizeSigned(offset) + origin.y, 
				app.util.randomizeSigned(offset) + origin.z
			);

			var b = app.geometry.makeBrick(
			 pos,
			 Math.floor(app.util.randomizeBounds(3,numSides)),
			 size+app.util.randomizeSigned(rand), 
			 thickness+app.util.randomizeSigned(rand),
			 rand);
			
			// this.bricks.push(b);
		
			size = size/2+(size/3);
		}


		

	},

	makeCluster : function( position, offset, numSides, size, thickness ,rand, count ){
		var c = new app.geometry.Cluster(position, offset, numSides, size, thickness ,rand, count);
		app.geometry.clusters.push(c);
		return c;	
	},

	makeBrick : function(position, numSides, size, thickness, rand){

		var b = new app.geometry.Brick(position, numSides, size, thickness, rand);
		app.geometry.bricks.push(b);
		
		return b;
	}


};