class Scenery {

    constructor() {

        this.scene = new THREE.Scene()

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.set(30, 28, 28)
        this.camera.lookAt(this.scene.position)

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);

        // Light
        this.light = new THREE.PointLight(0xffffff, 1);
        this.light.position.set(0, 30, 0);
        this.scene.add(this.light);

        // Axes
        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)

        this.makeFloor()


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

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);


        // Update przy zmanie wielkości okna

        // this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}