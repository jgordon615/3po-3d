var camera, scene, renderer;
var geometry, material, mesh;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 400;
    camera.position.x = 200;
    camera.position.y = 200;

    scene = new THREE.Scene();

//    geometry = new THREE.CubeGeometry(200,200,200);
    material = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});

    var textures = {};

    function loadImage(name, src) {
        var loader = new THREE.ImageLoader();
        var texture = new THREE.Texture();

        loader.addEventListener( 'load', function ( event ) {
            texture.image = event.content;
            texture.needsUpdate = true;
            textures[name] = texture;
        } );

        loader.load(src);
    }
    loadImage("BodyBlack", "images/body_b.png");
    loadImage("Body", "images/body.png");
    loadImage("Head", "images/head.png");

    var loader = new THREE.OBJLoader();
    loader.addEventListener('load', function(event){
        var object = event.content;

        object.traverse(function(child){
            if (child instanceof THREE.Mesh){
                child.material.map = textures[child.material.name];
            }
            object.position.y = -20;
            scene.add(object);
        })
    });
    loader.load('obj/c3po.obj');

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.position.y += 2;
    //camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}