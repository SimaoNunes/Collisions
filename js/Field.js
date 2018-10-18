/*Base e paredes da cena*/

class Field extends THREE.Object3D{

    addFieldBase(x,y,z,length,width){
        geometry = new THREE.BoxGeometry(length, 1, width)
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    constructor(x,y,z,length,width){
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    
        'use strict'

        material = new THREE.MeshBasicMaterial({color: 0x0d4c02, wireframe: true});

        var height = (Math.sqrt(Math.pow(length,2) + Math.pow(width,2)))/10;

        var grrossa = length / 40;

        this.addFieldBase(x,y,z,length,width);

        var wallLeft = new Wall(-(length/2)-(grrossa/2), y, z, width+grrossa*2, grrossa, height);
        var wallTop = new Wall(x, y, -(width/2)-(grrossa/2), grrossa, length, height);
        var wallRight = new Wall((length/2)+(grrossa/2), y, z, width+grrossa*2, grrossa, height);
        var wallBottom = new Wall(x, y, (width/2)+(grrossa/2), grrossa, length, height);

        this.add(wallLeft);
        this.add(wallTop);
        this.add(wallRight);
        this.add(wallBottom);

        //this.add(new THREE.AxisHelper(10));
    }    
}

class Wall extends THREE.Object3D{

    constructor(x, y, z, length, width, height){
        super();

        this.position.x = x;
        this.position.y = (height/2)+0.5;
        this.position.z = z;
    
        'use strict';
        
        material = new THREE.MeshBasicMaterial({color: 0xf2b02b, wireframe: true});
        geometry = new THREE.BoxGeometry(width, height, length)
        mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}