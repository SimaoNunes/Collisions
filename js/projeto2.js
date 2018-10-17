/*Segunda entrega, Cena Simples Interativa com Câmara Móvel e Colisões*/

var camera, scene, renderer, clock; // variaveis gerais relativas a animacao

var camera1, camera2, camera3; // diferentes tipos de cameras

var field;

var geometry, material, mesh;

var delta; // variavel relativa a passagem do tempo

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    field = new Field(0,0,0,80,40);     //(0,0,0) -> posição || (x,y) -> comprimento e largura

    scene.add(new THREE.AxisHelper(30));

    createCamera1();
    createCamera2();
    createCamera3();

    camera = camera3;

    scene.add(camera);
    scene.add(field);
}

function createCamera1() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(
        -window.innerWidth/20,
        window.innerWidth/20,
        window.innerHeight/20,
        -window.innerHeight/20,
        50,
        -50
    );
    
    camera1.position.x = 0;
    camera1.position.y = 30;
    camera1.position.z = 0;
}


function createCamera2() {
    'use strict';
    camera2 = new THREE.OrthographicCamera(
        -window.innerWidth/20,
        window.innerWidth/20,
        window.innerHeight/20,
        -window.innerHeight/20,
        -20,
        20
    );
    
    camera2.position.x = 0;
    camera2.position.y = 0;
    camera2.position.z = 30;
}


function createCamera3() {
    'use strict';
    camera3 = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);
    camera3.position.x = 50;
    camera3.position.y = 50;
    camera3.position.z = 50;
}


function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 49: //1
        camera = camera1; 
        break;
    case 50: //2
        camera = camera2; 
        break; 
    case 51: //3
        camera = camera3;
        break;
    }
}


function onKeyUp(e) {
    'use strict';
    switch (e.keyCode) {
    }
}


function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}


function render() {
    'use strict';
    renderer.render(scene, camera);
}


function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    createScene();

    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);    
}

function animate() {
    'use strict';

    render();

    camera.lookAt( scene.position );

    requestAnimationFrame(animate);
}