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

        material = new THREE.MeshBasicMaterial({color: 0x188e1a, wireframe: true});
        this.addFieldBase(x,y,z,widthX,lengthZ);

        var wall = new Wall(x,y,z, widthX, lengthZ);
        this.add(wall)
        //this.add(new THREE.AxisHelper(10));
    }    
}

class Wall extends THREE.Object3D{

    addWallX(x,y,z,X,Z){
        var height = 5
        geometry = new THREE.BoxGeometry(1, height, Z)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x+X/2, y+height/2, z);
        this.add(mesh);
    }

    addWallZ(x,y,z,X,Z){
        var height = 5
        geometry = new THREE.BoxGeometry(X, height, 1)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y+height/2, z+Z/2);
        this.add(mesh);
    }


    constructor(x, y, z, X, Z){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict';
        
        material = new THREE.MeshBasicMaterial({color: 0x188e1a, wireframe: true});
        this.addWallX(x,y,z,X,Z);
        this.addWallX(x,y,z,-X,Z);
        
        this.addWallZ(x,y,z,X,Z);
        this.addWallZ(x,y,z,X,-Z);


        this.add(mesh);
    }
}