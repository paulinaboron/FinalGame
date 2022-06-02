class BugLight extends THREE.PointLight {
    constructor(name, posX, posY) {
        super()
        this.name = name
        this.position.set(posX, 5, posY);
        this.color = { r: 1, g: 0, b: 1 }
        this.distance = 6
        this.intensity = 5
        this.caught = false
    }
}