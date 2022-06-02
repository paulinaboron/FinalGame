class Game {

    constructor() {
        console.log("game");


        this.scene = new THREE.Scene()
        this.scenery = new Scenery(this.scene)

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.set(15, 15, 15)
        // this.camera.position.set(0, 150, 0)
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

        this.scenery.makeFloor()
        this.scenery.makeNature()
        this.scenery.makeBugs()


        this.render()

        this.gameStarted = false
        // this.gameStarted = true

        window.addEventListener('resize', this.resizeWindow)



    }

    resizeWindow(){
        // Update przy zmanie wielkości okna

        // this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);

        if (this.gameStarted) {
            if (this.light.intensity < 1) {
                this.light.intensity += 0.008
            }
        } 
        else {
            this.camera.position.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0), // The positive y-axis
                0.001 // The amount of rotation to apply this time
            ));
            this.camera.lookAt(this.scene.position);
        }






        // Update przy zmanie wielkości okna

        // this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}