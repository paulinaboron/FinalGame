class BugLight extends THREE.PointLight {

    constructor(name, posX, posZ) {
        super()

        // Nazwa to zawsze "Light" i pozycja obiektu (np. dla 10 i -5 będzie "Light10-5")
        this.name = name
        this.posX = posX
        this.posZ = posZ
        // Czy robaczek został już złapany
        this.caught = false
        // Ustawienia światła
        this.position.set(posX, 5, posZ);
        this.color = { r: 1, g: 1, b: 0 }
        this.distance = 5.5
        
    }

    collecting(){
        if(this.caught == false){
            this.caught = true
            this.color = { r: 0, g: 1, b: 1 }
            this.intensity = 6
            let bugName = "Bug" + this.posX + this.posZ
            let bug = game.scene.getObjectByName(bugName, true);
            game.scene.remove(bug)
            game.score += 1
            ui.updateScore()
        }
    }
}