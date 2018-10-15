/*Base e paredes da cena*/

class Field extends THREE.Object3D{

    addFieldBase(x,y,z,width,lenght){
        geometry = new THREE.PlaneGeometry(lenght, width)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    constructor(x,y,z,h,width,lenght,height){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict'

        material = new THREE.MeshBasicMaterial({color: 0x188e1a, wireframe: false});

        this.addFieldBase(x,y,z,width,lenght);
        //this.add(new Wall(x,y,z, height, length))
        //this.add(new THREE.AxisHelper(10));
    }    
}

class Wall extends THREE.Object3D{
    constructor(x, y, z, height, length){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict';
        
        material = new THREE.MeshBasicMaterial({color: 0x188e1a, wireframe: false});
        geometry = new THREE.PlaneGeometry(height, length)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }
}