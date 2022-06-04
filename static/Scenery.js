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

        let scene = this.scene
        let cloneFbx = this.cloneFbx
        let bugPositions

        fetch("/GET_BUG_POSITIONS", { method: "post" })
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    bugPositions = data
                })

        const loader = new THREE.FBXLoader();
        loader.load('models/Wasp.fbx', function (object) {

            // Animacje
            // let mixer = new THREE.AnimationMixer(object);
            // console.log("animacje modelu", object.animations)
            // const action = mixer.clipAction(object.animations[1]);
            // action.play();

            bugPositions.forEach(e => {
                let clone = cloneFbx(object)
                clone.scale.set(.005, .005, .005)
                clone.position.set(e[0], 4, e[1])
                scene.add(clone);

                let bugLight = new BugLight('iiii', e[0], e[1])
                scene.add(bugLight)
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


    cloneFbx = (fbx) => {
        const clone = fbx.clone(true)
        clone.animations = fbx.animations
        clone.skeleton = { bones: [] }

        const skinnedMeshes = {}

        fbx.traverse(node => {
            if (node.isSkinnedMesh) {
                skinnedMeshes[node.name] = node
            }
        })

        const cloneBones = {}
        const cloneSkinnedMeshes = {}

        clone.traverse(node => {
            if (node.isBone) {
                cloneBones[node.name] = node
            }

            if (node.isSkinnedMesh) {
                cloneSkinnedMeshes[node.name] = node
            }
        })

        for (let name in skinnedMeshes) {
            const skinnedMesh = skinnedMeshes[name]
            const skeleton = skinnedMesh.skeleton
            const cloneSkinnedMesh = cloneSkinnedMeshes[name]

            const orderedCloneBones = []

            for (let i = 0; i < skeleton.bones.length; i++) {
                const cloneBone = cloneBones[skeleton.bones[i].name]
                orderedCloneBones.push(cloneBone)
            }

            cloneSkinnedMesh.bind(
                new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
                cloneSkinnedMesh.matrixWorld)

            // For animation to work correctly:
            clone.skeleton.bones.push(cloneSkinnedMesh)
            clone.skeleton.bones.push(...orderedCloneBones)
        }

        return clone
    }


}