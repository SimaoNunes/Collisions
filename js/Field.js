/*Base e paredes da cena*/

class Field extends THREE.Object3D{

    addFieldBase(x,y,z,widthX,lengthZ){
        geometry = new THREE.BoxGeometry(widthX, 1, lengthZ)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    constructor(x,y,z,widthX,lengthZ){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict'

        material = new THREE.MeshBasicMaterial({color: 0x188e1a, wireframe: false});
        this.addFieldBase(x,y,z,widthX,lengthZ);

        var wall = new Wall(x,y,z, widthX, lengthZ);
        this.add(wall)
        //this.add(new THREE.AxisHelper(10));
    }    
}

class Wall extends THREE.Object3D{

    addWall(x,y,z,height,length){
        geometry = new THREE.BoxGeometry(25, 1, 20)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }


    constructor(x, y, z, height, length){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict';
        
        material = new THREE.MeshBasicMaterial({color: 0x188e1a, wireframe: false});
        this.addWall(x,y,z,height,length);
        

        this.add(mesh);
    }
}