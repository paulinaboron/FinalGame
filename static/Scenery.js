class Scenery {

    constructor() {

        this.scene = new THREE.Scene()

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.set(15, 15, 15)
        this.camera.lookAt(this.scene.position)
        this.angle = 1

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);

        // Light
        this.light = new THREE.PointLight(0xffffff, .2);
        this.light.position.set(0, 10, 0);
        this.scene.add(this.light);

        // Axes
        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)

        this.makeFloor()
        this.makeNature()
        this.makeBugs()


        this.render()
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

        loader.load('models/scene.gltf', function (gltf) {
            // console.log("ew lista animacji ", gltf.scene.animations)
            // console.log(gltf.scene);
            // gltf.scene.traverse(function (child) {
            //     if (child.isMesh) {
            //         console.log(child)
            //     }
            // });
            // gltf.scene.scale.set(3, 3, 3)

            gltf.scene.rotation.y = 2
            scena.add(gltf.scene);

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
                            scena.add(gltf.scene);
                            gltf.scene.scale.set(3, 3, 3)
                            gltf.scene.position.x = (Math.random() * 20) - 10
                            gltf.scene.position.z = (Math.random() * 20) - 10

                        }, undefined, function (error) {
                            console.error(error);
                        });
                    });
                }
            )
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);

        this.camera.position.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0), // The positive y-axis
            0.001 // The amount of rotation to apply this time
        ));
        this.camera.lookAt(this.scene.position);

        // if(this.light.intensity < 1){
        //     this.light.intensity += 0.008
        // }
         


        // Update przy zmanie wielkości okna

        // this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}