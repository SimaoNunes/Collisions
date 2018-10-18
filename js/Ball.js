/*Classe das bolas que se moverão dentro da caixa*/

class Ball extends THREE.Object3D{

    constructor(x,y,z,diameter){
        super();

        this.position.x = x;
        this.position.y = (diameter/2)+0.5;
        this.position.z = z;
    
        'use strict'

        material = new THREE.MeshBasicMaterial({color: 0xf44242, wireframe: true});
        geometry = new THREE.SphereGeometry(diameter/2)
        mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);

        //this.add(new THREE.AxisHelper(10));
    }
}