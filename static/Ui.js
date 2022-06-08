class Ui {

    constructor() {
        console.log("ui");

        document.getElementById("playButton").onclick = this.playButtonClick;
        document.getElementById("refreshIcon").onclick = this.refreshIconClick;
    }

    playButtonClick() {
        document.getElementById("usernameInput").style.display = "none"
        document.getElementById("neonBox").classList.add("hidden")
        document.getElementById("waitingBox").classList.remove("hidden")
        net.addUser()
    }

    startGame() {
        document.getElementById("waitingBox").classList.add("hidden")
        document.getElementById("refreshIcon").classList.add("hidden")
        document.getElementById("scoreDiv").classList.remove("hidden")
        game.startGame()
    }

    updateScore() {
        document.getElementById("score").innerText = game.score + "/3"

        if (game.score == 3) {
            const body = JSON.stringify({ gameEnded: true })
            const headers = { "Content-Type": "application/json" }
            fetch("/END_GAME", { method: "post", body, headers })
            game.stopGame()
        }
    }

    playerWon() {
        document.getElementById("winner").classList.remove("hidden")
    }

    playerLost() {
        document.getElementById("loser").classList.remove("hidden")
    }

    refreshIconClick() {
        fetch("/REFRESH", { method: "post" })
    }

}