/*Classe das bolas que se moverão dentro da caixa*/

class Ball extends THREE.Object3D{

    constructor(x,z,diameter,paint,speed){
        'use strict'

        super();

        var dir = new THREE.Vector3(1,0,0);

        var per = new THREE.Vector3(0,0,1);

        this.userData = {velocity : speed, direction : dir, perpendicular : per}

        this.position.x = x;
        this.position.y = (diameter/2)+0.5;
        this.position.z = z;
    
        material = new THREE.MeshBasicMaterial({color: paint, wireframe: false});
        geometry = new THREE.SphereGeometry(diameter/2, 30, 30);
        mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);

        this.add(new THREE.AxisHelper(8));
    }
}