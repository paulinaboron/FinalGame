class Scenery {

    constructor(scene) {
        this.scene = scene
        console.log('scenery');
    }


    makeFloor() {
        const geometry = new THREE.PlaneGeometry(100, 100);
        const texture = new THREE.TextureLoader().load("./imgs/grass.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(6, 6);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x222222,
            shininess: 10,
            side: THREE.DoubleSide,
            map: texture
        })
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = Math.PI / 2;
        this.scene.add(plane);
    }

    makeBugs() {

        const loader = new THREE.GLTFLoader();
        let scena = this.scene
        let bugPositions

        fetch("/GET_BUG_POSITIONS", { method: "post" })
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    bugPositions = data
                })

        loader.load('models/scene.gltf', function (gltf) {
            // console.log("ew lista animacji ", gltf.scene.animations)
            // console.log(gltf.scene);
            // gltf.scene.traverse(function (child) {
            //     if (child.isMesh) {
            //         console.log(child)
            //     }
            // });

            bugPositions.forEach(e => {
                const clone = gltf.scene.clone();
                clone.scale.set(.5, .5, .5)
                clone.position.set(e[0], 4, e[1])
                scena.add(clone);

                let bugLight = new BugLight('iiii', e[0], e[1])
                scena.add(bugLight)
            });


        }, undefined, function (error) {
            console.error(error);
        });



    }


    makeNature() {
        const body = JSON.stringify({ x: 1 })
        const headers = { "Content-Type": "application/json" }

        fetch("/GET_MODEL_FILES", { method: "post", body, headers })
            .then(response => response.json())
            .then(
                data => {
                    const loader = new THREE.GLTFLoader();
                    let scena = this.scene
                    data.forEach(e => {

                        let path = 'models/nature/' + e;

                        loader.load(path, function (gltf) {

                            // dodanie do sceny
                            gltf.scene.scale.set(3, 3, 3)
                            gltf.scene.position.x = (Math.random() * 100) - 50
                            gltf.scene.position.z = (Math.random() * 100) - 50
                            scena.add(gltf.scene);

                            // klonowanie 12 razy
                            for (let i = 0; i < 12; i++) {
                                const clone = gltf.scene.clone();
                                clone.scale.set(3, 3, 3)
                                clone.position.x = (Math.random() * 100) - 50
                                clone.position.z = (Math.random() * 100) - 50
                                scena.add(clone);
                            }

                        }, undefined, function (error) {
                            console.error(error);
                        });
                    });
                }
            )
    }


}