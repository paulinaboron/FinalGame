class BugLight extends THREE.PointLight {
    constructor(name, posX, posY) {
        super()
        this.name = name
        this.position.set(posX, 5, posY);
        this.color = { r: 1, g: 1, b: 0 }
        this.distance = 5.5
        this.intensity = 5
        this.caught = false
    }
}