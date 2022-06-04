
class Game {

    constructor() {
        console.log("game");

        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog(0x000000, 10, 50)
        this.scenery = new Scenery(this.scene)

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.set(15, 10, 15)
        this.camera.lookAt(this.scene.position)

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);

        // Light
        this.light = new THREE.SpotLight(0xffffff, .5)
        this.light.position.set(0, 20, 0);
        this.light.penumbra = .9
        this.light.angle = 1
        this.light.decay = 1
        this.light.focus = .8
        this.light.distance = 100
        this.scene.add(this.light)

        

        this.scenery.makeFloor()
        this.scenery.makeNature()


        this.render()

        this.gameStarted = false




    }

    startGame(){
        this.gameStarted = true
        this.camera.position.set(15, 5, 15)
        this.light.position.set(this.camera.position.x, 20, this.camera.position.z)
        this.light.intensity = 0
        this.light.target = this.camera

        
        // Controls
        this.controls = new PointerLockControls(this.camera, this.renderer.domElement)
        this.controls.lock()
        window.addEventListener('keydown', (e)=> this.onKeyDown(e), false)
        window.addEventListener('click', () => this.onMouseClick(), false)


        // Świetliki
        this.scenery.makeBugs()

    }

    onKeyDown(event) {
        console.log(event.code);
        switch (event.code) {
            case 'KeyW':
                this.controls.moveForward(0.25)
                break
            case 'KeyA':
                this.controls.moveRight(-0.25)
                break
            case 'KeyS':
                this.controls.moveForward(-0.25)
                break
            case 'KeyD':
                this.controls.moveRight(0.25)
                break
            case 'Backspace':
                this.stopControls()
                break
        }

        this.light.position.set(this.camera.position.x, 20, this.camera.position.z)
    }

    stopControls = () =>{
        this.controls.unlock()
        this.controls.disconnect()
    }

    onMouseClick(){
        this.controls.lock()
        this.controls.connect()
    }


    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);

        if (this.gameStarted) {
            if (this.light.intensity < 1.2) {
                this.light.intensity += 0.01
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