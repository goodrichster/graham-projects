var scene;
var camera;
var renderer;
var controls;
var mesh;
var edgesHelper;
var animationId;

function getSelectedSolid() {
	return $('#solid').val();
}

function buildGeometryForSolid(solidKey) {
	var geometry;
	var counts = { V: 0, E: 0, F: 0 };

	switch (solidKey) {
		case 'tetrahedron':
			geometry = new THREE.TetrahedronGeometry(1, 0);
			counts = { V: 4, E: 6, F: 4 };
			break;
		case 'cube':
			geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
			counts = { V: 8, E: 12, F: 6 };
			break;
		case 'octahedron':
			geometry = new THREE.OctahedronGeometry(1, 0);
			counts = { V: 6, E: 12, F: 8 };
			break;
		case 'dodecahedron':
			geometry = new THREE.DodecahedronGeometry(1, 0);
			counts = { V: 20, E: 30, F: 12 };
			break;
		case 'icosahedron':
			geometry = new THREE.IcosahedronGeometry(1, 0);
			counts = { V: 12, E: 30, F: 20 };
			break;
		default:
			geometry = new THREE.TetrahedronGeometry(1, 0);
			counts = { V: 4, E: 6, F: 4 };
	}

	return { geometry: geometry, counts: counts };
}

function disposeCurrent() {
	if (animationId) {
		cancelAnimationFrame(animationId);
		animationId = null;
	}
	if (controls) {
		controls.dispose();
		controls = null;
	}
	if (renderer) {
		try {
			renderer.dispose();
		} catch (e) {}
		renderer = null;
	}
	scene = null;
	camera = null;
	mesh = null;
	edgesHelper = null;
	var container = document.getElementById('renderer');
	if (container) {
		container.innerHTML = '';
	}
}

function initPolyhedron() {
	disposeCurrent();

	var container = document.getElementById('renderer');
	var width = container.clientWidth || 600;
	var height = container.clientHeight || 400;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xfafafa);

	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
	camera.position.set(3, 3, 3);

	var ambient = new THREE.AmbientLight(0xffffff, 0.6);
	scene.add(ambient);
	var dir = new THREE.DirectionalLight(0xffffff, 0.8);
	dir.position.set(5, 5, 5);
	scene.add(dir);

	var result = buildGeometryForSolid(getSelectedSolid());
	var geometry = result.geometry;

	geometry.computeBoundingSphere();
	var material = new THREE.MeshPhongMaterial({ color: 0xd32f2f, shininess: 60, flatShading: true, specular: 0x222222 });
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	var edges = new THREE.EdgesGeometry(geometry, 1);
	edgesHelper = new THREE.LineSegments(
		edges,
		new THREE.LineBasicMaterial({ color: 0x111111 })
	);
	scene.add(edgesHelper);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio || 1);
	renderer.setSize(width, height);
	container.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.08;
	controls.rotateSpeed = 0.6;

	updateCountsAndTable(result.counts);

	function animate() {
		animationId = requestAnimationFrame(animate);
		mesh.rotation.y += 0.005;
		mesh.rotation.x += 0.002;
		controls.update();
		renderer.render(scene, camera);
	}
	animate();

	window.onresize = function() {
		if (!renderer || !camera) return;
		var w = container.clientWidth || 600;
		var h = container.clientHeight || 400;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h);
	};
}

function updateCountsAndTable(counts) {
	$('#verticesCount').text(counts.V);
	$('#edgesCount').text(counts.E);
	$('#facesCount').text(counts.F);

	var eulerValue = counts.V - counts.E + counts.F;
	var eulerString = counts.V + ' - ' + counts.E + ' + ' + counts.F + ' = ' + eulerValue;

	var dataSet = [ [counts.V, counts.E, counts.F, eulerString] ];

	$('#countsTable').DataTable({
		destroy: true,
		paging: false,
		ordering: false,
		searching: false,
		retrieve: true,
		data: dataSet,
		columns: [
			{ title: 'V' },
			{ title: 'E' },
			{ title: 'F' },
			{ title: 'V - E + F' }
		]
	});
}