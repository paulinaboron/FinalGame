class BugLight extends THREE.SpotLight {

    constructor(name, posX, posZ) {
        super()

        // Nazwa to zawsze "Light" i pozycja obiektu (np. dla 10 i -5 będzie "Light10-5")
        this.name = name
        this.posX = posX
        this.posZ = posZ

        // Czy robaczek został już złapany
        this.caught = false

        // Ustawienia światła
        this.position.set(posX, 10, posZ);
        this.color = { r: 1, g: 1, b: 0 }
        this.angle = 0.15
        this.penumbra = 1

    }

    // Zbieranie robaczka
    collecting() {
        if (this.caught == false) {
            this.caught = true
            this.color = { r: 0, g: 1, b: 1 }
            let bugName = "Bug" + this.posX + this.posZ
            let bug = game.scene.getObjectByName(bugName, true);
            game.scene.remove(bug)
            game.score += 1

            ui.updateScore()

            const body = JSON.stringify({bug: this.name})
            const headers = { "Content-Type": "application/json" }
            fetch("/BUG_CAUGHT", { method: "post", body, headers })
        }
    }

    // Gdy robaczek został zebrany przez drugiego gracza
    collectedByOtherPlayer() {

        this.color = { r: 1, g: 0, b: 0 }
        if (this.caught == false) {
            
            this.caught = true
            this.color = { r: 1, g: 0, b: 0 }

            // usuwanie robaczka ze sceny
            let bugName = "Bug" + this.posX + this.posZ
            let bug = game.scene.getObjectByName(bugName, true);
            game.scene.remove(bug)

            const body = JSON.stringify({bug: null})
            const headers = { "Content-Type": "application/json" }
            fetch("/BUG_CAUGHT", { method: "post", body, headers })
        }

    }
}