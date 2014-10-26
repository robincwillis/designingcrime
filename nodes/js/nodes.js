paper.install(window);

var app = {};

app = {

	node: function(){

		this.particle = "";
		this.path =  "";
		this.size = "";
		this.stem = "";
		this.branches = [];
	},

	branch: function(){
		this.nodeA = "";
		this.nodeB = "";
		this.spring= "";
		this.path= "";
		this.length="";
	},

	c : $('#myCanvas'),
	//ctx : app.c.getContext('2d'),
	gravity : 0,
	p : {},
	centroid : {},
	particleSystem : {},
	nodes : [],
	branches : [],
	nodeSize : 20,
	edgeLength : 90,
	edgeStrength : 0.1,
	spaceStrength : 200,
	minDistance : 20,
	mass : 0.2,
	path : "",
	centroid : "",

	init : function(physics){

		app.p = physics;



		var x = view.center.x;
		var y = view.center.y;

		app.centroid = app.buildNode(x, y, app.nodeSize);

		//app.centroid.particle.makeFixed();

		app.nodes.push(app.centroid);

		//app.path = app.drawParticle(particle);
		app.buildNodes(300);
		//app.buildSprings();
		app.p.play(); 

		$(window).click(function(){
			app.addNode();
		})

	},

	buildNodes : function(nodeCount){

		var c = 0;
		for(var i = 0; i < nodeCount; i++){
			
			// var t=setInterval(function(){

			 	app.addNode();
			// 	c++;
			// 	 if(c >= nodeCount) clearInterval(t);

			// },10)

				
	
		}

	
	},

	buildNode : function(x, y, size){

		var p = app.p.makeParticle(app.mass, x,y);
		var path = app.makeNodePath(p, size);
		var n = new app.node;
		n.particle = p;
		n.path = path;
		n.size = size;
		return n;
	},
	buildBranch: function(nodeA, nodeB, rest){

		var a = nodeA;
		var b = nodeB;
		var spring = app.p.makeSpring(a.particle, b.particle, app.edgeStrength, app.edgeStrength, rest);
		var branch = new app.branch;
		
		var path = app.makeBranchPath(a.particle, b.particle);
		branch.spring = spring;
		branch.path = path;
		branch.length = rest;
		branch.nodeA = nodeA;
		branch.nodeB = nodeB;
		return branch;

	},

	buildSpacer : function(a, b, strength){

		 var attraction = physics.makeAttraction(a.particle, b.particle, -strength, app.minDistance);

	},

	makeNodePath : function(particle, size){

		var myCircle = new Path.Circle(
		new Point(particle.position.x, particle.position.y), size);
		myCircle.fillColor = 'black';
		return myCircle;
	},

	makeBranchPath : function(pA, pB){
	

		var myPath = new Path();
		myPath.strokeColor = 'black';
		myPath.add(new Point(pA.position.x, pA.position.y), new Point(pB.position.x, pB.position.y));
		return myPath;
	},

	render : function(event){
		 
		 app.updateNodes();
	},

	updateNodes : function(){

		for(var i = app.branches.length-1; i >=0; i-=1){
			var b = app.branches[i];
			
			b.path.segments[0].point.x  = b.nodeA.particle.position.x;
			b.path.segments[0].point.y  = b.nodeA.particle.position.y;
			b.path.segments[1].point.x  = b.nodeB.particle.position.x;
			b.path.segments[1].point.y  = b.nodeB.particle.position.y;
		}

		for(var i = app.nodes.length-1; i >=0; i-=1){
			var n = app.nodes[i];
			n.path.position.x = n.particle.position.x;
			n.path.position.y = n.particle.position.y;
		}

		app.centroid.particle.position.x = view.center.x;
		app.centroid.particle.position.y = view.center.y;
	},

	addNode : function(){

		var i = Math.floor(Math.random()*app.nodes.length);
		var a = app.nodes[i];

		var offset = a.stem.length;
		var offx = offset *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		var offy = offset *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

		var x = a.particle.position.x + offx;// Math.floor(100*Math.random());
		var y = a.particle.position.y + offy; //Math.floor(100*Math.random());
		


		
	
		var size = Math.floor((a.size/3)*2);
		
		var n = app.buildNode(x, y, size);


		var length = Math.floor((a.stem.length/3)*2);
		
		var length = (a.stem.length/3)*2;

		if (length == 0){
			length = app.edgeLength;
		}
		var b = app.buildBranch(n, app.nodes[i], length);
		
		app.branches.push(b);
		n.stem = b;
		a.branches.push(b);

		for(var i= 0; i < app.nodes.length; i ++){
			app.buildSpacer(n, app.nodes[i], app.spaceStrength);
		}
		app.buildSpacer(n, app.centroid, app.spaceStrength * 3);
		app.nodes.push(n);

	}
};


var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
paper.setup(canvas);  

drag = 0.01;
console.log(drag);
window.physics = new Physics(app.gravity, drag);

(function() {

	app.init(physics);

	view.onFrame = function(event) {
		app.render(event);
	};

})();