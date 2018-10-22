/*Segunda entrega, Cena Simples Interativa com Câmara Móvel e Colisões*/

var camera, scene, renderer, clock; // variaveis gerais relativas a animacao

var camera1, camera2, camera3; // diferentes tipos de cameras

var field, balls;

var length, width, diameter; // comprimento e largura do campo e diametro da bola (altura das paredes)

var geometry, material, mesh;

var delta; // variavel relativa a passagem do tempo

var ballsLength = 1;  //numero de bolas

var onCollision = [];

var combinations = getCombinations(ballsLength);

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

        balls[i].rotateY(correctAxis(balls[i].userData.direction));
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

function getCombinations(n){
    var combinations = [];
    var seq = [];
    for(var i = 0; i < n; i++){seq.push(i);}
    for(var i=0; i < seq.length; i++){
        for(var j=i+1; j < seq.length; j++){
            combinations.push([seq[i],seq[j]])
        }
    }
    return combinations
}

function hasCollision(){

    var i, radius,x,z;
    
    radius = diameter/2;

    for(i=0; i<ballsLength; i++){
        // variaveis auxiliares
        x      = balls[i].position.x + balls[i].userData.direction[0]*balls[i].userData.velocity*(delta);
        z      = balls[i].position.z + balls[i].userData.direction[1]*balls[i].userData.velocity*(delta);
        limitZ = (width/2)-radius;
        limitX = (length/2)-radius;

        // limite superior e inferior
        if( Math.abs(z) >= limitZ ){
            balls[i].userData.direction[1] = -balls[i].userData.direction[1];
        }
        //limite direito e esquerdo
        if( Math.abs(x) >= limitX){
            balls[i].userData.direction[0] = -balls[i].userData.direction[0];
        }
    }

    // restantes bolas   
    if(combinations.length!=0){
        for(var j=0; j<combinations.length; j++){
            
            var comb = combinations[j];
            var BallIndex1 = comb[0];
            var BallIndex2 = comb[1];

            var radiusSum  = diameter**2;

            var x1 = balls[BallIndex1].position.x + balls[BallIndex1].userData.direction[0]*balls[BallIndex1].userData.velocity*(delta);
            var z1 = balls[BallIndex1].position.z + balls[BallIndex1].userData.direction[1]*balls[BallIndex1].userData.velocity*(delta);
            
            var x2 = balls[BallIndex2].position.x + balls[BallIndex2].userData.direction[0]*balls[BallIndex2].userData.velocity*(delta);
            var z2 = balls[BallIndex2].position.z + balls[BallIndex2].userData.direction[1]*balls[BallIndex2].userData.velocity*(delta);

            var centerDistance = (x1-x2)**2 + (z1-z2)**2;

            if( radiusSum  >= centerDistance ){
                var iDirection = balls[BallIndex1].userData.direction;
                var jDirection = balls[BallIndex2].userData.direction;
                balls[BallIndex1].userData.direction = jDirection;
                balls[BallIndex2].userData.direction = iDirection;
            }
        }
    }
}

function correctAxis(vec){
    var x = vec[0];
    var z = vec[1];

    if(z>=0 && x>=0){
        return Math.atan(x/z);
    }
    else if(z>=0 && x<=0){
        return -Math.atan(x/z);
    }
    else if(x<=0 && z>=0){
        return -Math.atan(x/z);
    }
    else{
        return Math.PI + Math.atan(x/z)
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
    //CONA
    render();

    clock = new THREE.Clock(); 

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);    
}

function animate() {
    'use strict';

    var i;

    // UPDATE //

    camera.lookAt(scene.position);

    delta = clock.getDelta();

    var vecX, vecZ;
    var q = new THREE.Quaternion();

    for(i=0; i < ballsLength; i++){
        balls[i].position.x += balls[i].userData.direction[0]*balls[i].userData.velocity*(delta);
        balls[i].position.z += balls[i].userData.direction[1]*balls[i].userData.velocity*(delta);
        vecX = balls[i].userData.direction[0];
        vecZ = balls[i].userData.direction[1];
        // console.log(vecX);
        // console.log(vecZ);
        // balls[i].rotateOnAxis( new THREE.Vector3(1, 0,0), 0.5);
    }   


    hasCollision();
    
    // DISPLAY //

    render();

    requestAnimationFrame(animate);
}