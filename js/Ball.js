
/*Classe das bolas que se moverão dentro da caixa*/

class Ball extends THREE.Object3D{

    constructor(x,z,diameter,paint){
        'use strict'

        super();

        var speed = new THREE.Vector3(1,0,0);

        speed.multiplyScalar(Math.random()*5+2);

        this.userData = {velocity : speed}

        this.position.x = x;
        this.position.y = (diameter/2)+0.5;
        this.position.z = z;
    
        material = new THREE.MeshBasicMaterial({color: paint, wireframe: true});
        geometry = new THREE.SphereGeometry(diameter/2, 30, 30);
        mesh = new THREE.Mesh(geometry, material);

        var smallGeometry = new THREE.SphereGeometry(diameter/4, 8, 8);
        var smallMesh = new THREE.Mesh(smallGeometry, material);
        
        this.add(smallMesh);
        this.add(mesh);
        this.add(new THREE.AxisHelper(8));

    }
}
