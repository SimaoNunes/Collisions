/*Base e paredes da cena*/

class Field extends THREE.Object3D{

    constructor(x,y,z){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict'

        material = new THREE.MeshBasicMaterial({color: 0x349627, wireframe: false});

        this.add(new Base(0,0,0))
    }    
}

class Base extends THREE.Object3D{
    constructor(x, y, z){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict';
        
        material = new THREE.MeshBasicMaterial({color: 0x349627, wireframe: false});
        geometry = new THREE.PlaneGeometry(40, 20)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }
}