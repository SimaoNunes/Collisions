/*Classe das bolas que se moverão dentro da caixa*/

class Ball extends THREE.Object3D{

    constructor(x,z,diameter,paint){
        'use strict'

        super();

        this.userData = { velocity : 10, 
                          direction: [THREE.Math.randFloat(-1,1), THREE.Math.randFloat(-1,1)]
        }

        this.position.x = x;
        this.position.y = (diameter/2)+0.5;
        this.position.z = z;
    
        material = new THREE.MeshBasicMaterial({color: paint, wireframe: false});
        geometry = new THREE.SphereGeometry(diameter/2, 30, 30)
        mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);

        this.add(new THREE.AxisHelper(8));
    }
}