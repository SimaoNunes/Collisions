/*Segunda entrega, Cena Simples Interativa com Câmara Móvel e Colisões*/

var camera, scene, renderer, clock; // variaveis gerais relativas a animacao

var camera1, camera2, camera3; // diferentes tipos de cameras

var field, balls;

var length, width, diameter; // comprimento e largura do campo e diametro da bola (altura das paredes)

var geometry, material, mesh;

var delta; // variavel relativa a passagem do tempo

var ballsLength = 10;   //numero de bolas


function createScene() {
    'use strict';

    scene = new THREE.Scene();

    length = 90;
    width = 45;

    field = new Field(0,0,0,length,width);     //(0,0,0) -> posição || (x,y) -> comprimento e largura

    diameter = (Math.sqrt(Math.pow(length,2) + Math.pow(width,2)))/10;

    var i, position, collision;

    balls = [];

    var paintJob;

    for(i=0; i  < ballsLength; i++){

        if(i == 0){paintJob = 0xff0000;}
        else{paintJob = 0x9b9da0}
        
        position = getRandomCoordinates(length, width);
        collision = verifyCollisionOnStart(position);

        while(collision){
            position = getRandomCoordinates(length, width);
            collision = verifyCollisionOnStart(position);
        }
        
        balls[i] = new Ball(position[0],position[1],diameter,paintJob);
        
        scene.add(balls[i]);

        var jesus                = Math.random()*Math.PI*2;
        balls[i].userData.angle  = jesus; 

        balls[i].rotateY(jesus);        
    }

    createCamera1();
    createCamera2();
    createCamera3();

    camera = camera1;

    scene.add(camera);
    scene.add(field);

    balls[0].add(camera3);
    scene.traverse(function (node) {
        if (node instanceof THREE.AxisHelper) {
            node.visible = !node.visible;
        }
    });
}



function createCamera1() {
    'use strict';
    camera1 = new THREE.OrthographicCamera(
        -window.innerWidth/20,
        window.innerWidth/20,
        window.innerHeight/20,
        -window.innerHeight/20,
        -50,
        50
    );
    camera1.position.x = 0;
    camera1.position.y = 30;
    camera1.position.z = 0;
}


function createCamera2() {
    'use strict';
    camera2 = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);
    camera2.position.x = 50;
    camera2.position.y = 50;
    camera2.position.z = 50;
}


function createCamera3() {
    'use strict';
    camera3 = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,1000);

    camera3.position.x = 0;
    camera3.position.y = diameter + diameter/2;
    camera3.position.z = 0;
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


function getRandomCoordinates(length,width){
    var randomX, randomZ;
    randomX = Math.random()*(length-diameter) - (length-diameter)/2;
    randomZ = Math.random()*(width-diameter) - (width-diameter)/2; 
    return [randomX, randomZ];
}


function verifyCollisionOnStart(position){
    var i, x, z, radiusSum, centerDistance;

    x   = position[0];
    z   = position[1];
    radiusSum  = diameter**2;
    
    for(i=0; i<balls.length; i++){
        centerDistance = (x-balls[i].position.x)**2 + (z-balls[i].position.z)**2;
         if( radiusSum  >= centerDistance){
            return true;
        }
    }
    return false;
}

function hasCollision(){
    var i, radius,pi,x,z;
    
    pi = Math.PI;
    radius = diameter/2;

    for(i=0; i<ballsLength; i++){

        ball   = balls[i];
        angle  = ball.userData.angle;
        x      = ball.position.x;
        z      = ball.position.z;
        limitZ = (width/2)-radius;
        limitX = (length/2)-radius;

        // limite superior
        if( z <= -1*limitZ || z >= limitZ ){
            if( 0 <= angle && angle <= pi){
                balls[i].rotateY(-2*angle);
                balls[i].userData.angle = 2*pi-angle;
            }
        }
        // limite inferior
        if( z >= limitZ){
            if( pi <= angle && angle <= 2*pi){
                balls[i].rotateY(2*(2*pi - angle));
                balls[i].userData.angle = 2*pi - angle;
            }
        }
        //limite direito
        if( x >= limitX){
            balls[i].rotateY(pi-2*angle);
            if( 0 <= angle && angle <= pi/2 ){
                balls[i].userData.angle = pi - angle;
            }
            if((3/4)*pi <= angle && angle <= 2*pi){
                balls[i].userData.angle = 2*pi-angle+pi;
            }
        }
        //limite esquerdo
        if( x <= -1*limitX){
            if( angle <= pi ){
                balls[i].rotateY(pi-2*angle);
                balls[i].userData.angle = pi - angle;
            }
            if( pi <= angle){
                balls[i].rotateY(-2*angle+pi);
                balls[i].userData.angle = 2*pi - angle + pi;
            }
        }
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

    var i;

    // UPDATE //

    if(camera == camera3){
        balls[0].children[2].position.x = -diameter*1.5;
        balls[0].children[2].position.z = 0;
        camera.lookAt(scene.position);
    }

    else{
        camera.lookAt(scene.position);
    }

    ballsLength = balls.length;

    for(i=0; i < ballsLength; i++){
        balls[i].translateX(balls[i].userData.velocity);
    }   

    hasCollision();

    // DISPLAY //

    render();

    requestAnimationFrame(animate);
}